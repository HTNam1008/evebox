import { Injectable } from "@nestjs/common";
import { VectorStoreCohereService } from "src/infrastructure/vector/vector_store.cohere";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RouteDescription } from "../../utils/navigation.enum";

@Injectable()
export class NavigationService {
  constructor(
    private readonly vectorStoreCohereService: VectorStoreCohereService,
  ) {}

  async select_route(query: string, geminiApiKey: string){
    const model = new ChatGoogleGenerativeAI({
      apiKey: geminiApiKey,
      model: 'gemini-1.5-pro',
      maxOutputTokens: 2048,
    });

    var template = `
    Bạn là một trợ lý AI. Dưới đây là các tài liệu có thể liên quan đến câu hỏi:
    Tôi sẽ cung cấp cho bạn một danh sách các tuyến đường và mô tả của chúng. Bạn sẽ cần phải chọn một trong những tuyến đường đó dựa trên câu hỏi của tôi.
    {routeMap}
    Tôi cần bạn chọn một trong những tuyến đường trên dựa trên câu hỏi của tôi, kèm theo lý do tại sao bạn chọn nó, và hướng dẫn tiếp theo nếu có.
    Câu hỏi: {question}
    Hãy trả lời một cách chính xác và rõ ràng nhất dựa trên các tài liệu trên.
    `

    const promptTemplate = PromptTemplate.fromTemplate(template);
    const prompt = await promptTemplate.format({
      question: query,
      routeMap: Object.entries(RouteDescription)
      .map(([route, description]) => `- ${route}: ${description}`)
      .join('\n'),
    });
    console.log(prompt);

    const response = await model.invoke(prompt);
    console.log(response);
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
}