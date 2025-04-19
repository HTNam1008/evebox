// rag.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { VectorStoreCohereService } from 'src/infrastructure/vector/vector_store.cohere';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { Document } from 'langchain/document';

type RAGState = {
  question: string;
  context?: Document[];
  answer?: string;
  nextPrompt?: string;
};

@Injectable()
export class RAGService {
  private readonly logger = new Logger(RAGService.name);

  constructor(private readonly vectorStore: VectorStoreCohereService) {}

  private async retrieve(state: RAGState): Promise<Partial<RAGState>> {
    this.logger.log(`📥 [Step: Retrieve] Searching for relevant documents...`);
    const store =  await this.vectorStore['getVectorStore']("eveboxEvents");
    const results = await store.similaritySearch(state.nextPrompt || state.question, 10);
    return { context: results };
  }

  private async generate(state: RAGState): Promise<Partial<RAGState>> {
    this.logger.log(`🤖 [Step: Generate] Creating answer using Gemini...`);

    const promptTemplate = PromptTemplate.fromTemplate(`
Bạn là trợ lý AI. Dưới đây là các tài liệu có thể liên quan đến câu hỏi:

Kết quả search similarity: {context}

Câu hỏi gốc: {question}

Câu hỏi sau khi xử lý qua invoke: {nextPrompt}

Hãy trả lời một cách chính xác và rõ ràng nhất dựa trên các tài liệu trên, vì sao lại chuyển đến trang search, kết quả search có yếu tố gì để đáp ứng được.
    `);

    const prompt = await promptTemplate.format({
      question: state.question,
      context: state.context?.map(doc => doc.pageContent).join('\n\n') || '',
      nextPrompt: state.nextPrompt || '',
    });

    const model = new ChatGoogleGenerativeAI({
      apiKey: 'AIzaSyBFkHW7QIXxiVaiThw3ItS3ruhK2XZSKYc',
      model: 'gemini-1.5-pro',
      maxOutputTokens: 2048,
    });

    const response = await model.invoke(prompt);
    const content =
      typeof response === 'string'
        ? response
        : 'content' in response
          ? Array.isArray(response.content)
            ? response.content.map(part => (typeof part === 'string' ? part : JSON.stringify(part))).join('')
            : response.content
          : JSON.stringify(response);

    return { answer: content };
  }

  async askQuestion(nextPrompt: string, originalQuestion: string): Promise<{
    answer: string;
    context?: Document[];
  }> {
    const state: RAGState = { question: originalQuestion, nextPrompt };

    try {
      const retrieved = await this.retrieve(state);
      const generated = await this.generate({ ...state, ...retrieved });

      const answer = generated.answer ?? '❌ No answer generated.';
      this.logger.log(`✅ Final answer generated.`);
      return {
        answer,
        context: retrieved.context,
      };
    } catch (error) {
      this.logger.error(`❌ RAG flow failed: ${error.message}`);
      throw error;
    }
  }
}
