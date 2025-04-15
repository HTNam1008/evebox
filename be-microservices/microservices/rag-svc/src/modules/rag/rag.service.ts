// rag.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { VectorStoreCohereService } from 'src/infrastructure/vector/vector_store.cohere';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { Document } from 'langchain/document';

@Injectable()
export class RAGService {
  private readonly logger = new Logger(RAGService.name);

  constructor(private readonly vectorStore: VectorStoreCohereService) {}

  async generateAnswer(question: string, contextDocs: Document[], geminiApiKey: string): Promise<string> {
    const promptTemplate = PromptTemplate.fromTemplate(`
Bạn là trợ lý AI. Dưới đây là các tài liệu có thể liên quan đến câu hỏi:

{context}

Câu hỏi: {question}

Hãy trả lời một cách chính xác và rõ ràng nhất dựa trên các tài liệu trên.
    `);

    const prompt = await promptTemplate.format({
      question,
      context: contextDocs.map((doc) => doc.pageContent).join('\n\n'),
    });

    const model = new ChatGoogleGenerativeAI({
      apiKey: geminiApiKey,
      model: 'gemini-1.5-pro',
      maxOutputTokens: 2048,
    });
    

    const response = await model.invoke(prompt);

    if (typeof response === 'string') {
      return response;
    }

    if (typeof response === 'object' && 'content' in response) {
      return typeof response.content === 'string'
        ? response.content
        : Array.isArray(response.content)
          ? response.content.map(part => (typeof part === 'string' ? part : JSON.stringify(part))).join('')
          : JSON.stringify(response.content);
    }

    return JSON.stringify(response);
  }

  async askQuestion(query: string, geminiApiKey: string): Promise<string> {
    try {
      this.logger.log(`🔍 Searching relevant docs for query: ${query}`);
      const store = await this.vectorStore['getVectorStore']("eveboxEvents");
      const results = await store.similaritySearch(query, 3);

      this.logger.log(`✍️ Generating answer with Gemini...`);
      return await this.generateAnswer(query, results, geminiApiKey);
    } catch (error) {
      this.logger.error(`❌ RAG pipeline failed: ${error.message}`);
      throw error;
    }
  }
}