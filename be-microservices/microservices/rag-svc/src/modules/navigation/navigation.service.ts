// navigation.service.ts
import { Injectable } from "@nestjs/common";
import { VectorStoreCohereService } from "src/infrastructure/vector/vector_store.cohere";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RouteDescription, RouteEnum } from "../../utils/navigation.enum";
import { RAGService } from "../rag/rag.service";

type NavigationResult = {
  Route: string;
  Message: string;
  NextPrompt: string | null;
  ResultMessage?: string;
  Result?: string[];
};

@Injectable()
export class NavigationService {
  constructor(
    private readonly vectorStoreCohereService: VectorStoreCohereService,
    private readonly ragService: RAGService,
  ) {}

  async select_route(query: string, geminiApiKey: string): Promise<NavigationResult> {
    const model = new ChatGoogleGenerativeAI({
      apiKey: geminiApiKey,
      model: 'gemini-1.5-pro',
      maxOutputTokens: 2048,
    });

    const template = `
Bạn là một trợ lý AI. Dưới đây là danh sách các route có thể điều hướng:
{routeMap}

Tôi sẽ cung cấp một câu hỏi của người dùng. Dựa vào đó, bạn phải chọn một trong các route trên, kèm lý do, và nếu route là "SEARCH_PAGE", hãy sinh ra một câu lệnh tìm kiếm phù hợp.

Hãy trả về kết quả theo định dạng JSON như sau (chú ý dùng dấu ngoặc kép đúng chuẩn JSON):

\`\`\`json
{{
  "Route": "ROUTE_NAME",
  "Message": "Giải thích với người dùng, tại sao lại chọn route này, và các hướng dẫn cần thiết",
  "NextPrompt": "Câu lệnh tìm kiếm hoặc null"
  }}
\`\`\`

Câu hỏi: {question}
`;

    const promptTemplate = PromptTemplate.fromTemplate(template);
    const prompt = await promptTemplate.format({
      question: query,
      routeMap: Object.entries(RouteDescription)
        .map(([route, description]) => `- ${route}: ${description}`)
        .join('\n'),
    });

    const response = await model.invoke(prompt);
    console.log('Gemini response:')
    console.log(response);
    const raw = typeof response === 'string'
      ? response
      : (typeof response === 'object' && 'content' in response
          ? (typeof response.content === 'string'
              ? response.content
              : JSON.stringify(response.content))
          : JSON.stringify(response));

    function extractJSONFromMarkdown(raw: string): any {
      const match = raw.match(/```json\s*([\s\S]*?)```/);
      const jsonStr = match ? match[1] : raw;
      return JSON.parse(jsonStr);
    }

    try {
      var parsed: NavigationResult = extractJSONFromMarkdown(raw);

      if (!parsed.Route || !(parsed.Route in RouteDescription)) {
        throw new Error(`Invalid Route: ${parsed.Route}`);
      }

      if (parsed.Route === RouteEnum.SEARCH_PAGE) {
        const { answer, context} = await this.ragService.askQuestion(parsed.NextPrompt, query);
        parsed.Result = context.map((doc) => doc.metadata?.id ?? 'unknown');

        parsed.ResultMessage = answer;
      }

      return parsed;
    } catch (err) {
      throw new Error(`❌ Failed to parse Gemini response: ${err.message}\nRaw content:\n${raw}`);
    }
  }
}
