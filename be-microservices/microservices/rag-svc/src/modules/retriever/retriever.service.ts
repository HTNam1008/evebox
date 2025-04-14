import { Injectable, Logger } from '@nestjs/common';
import { VectorStoreCohereService } from 'src/infrastructure/vector/vector_store.cohere';
import { Document } from 'langchain/document';

@Injectable()
export class RetrieverService {
  private readonly logger = new Logger(RetrieverService.name);
  private readonly COLLECTION_NAME = 'eveboxEvents';

  constructor(
    private readonly vectorStoreService: VectorStoreCohereService,
  ) {}

  async search(query: string, k = 5, scoreThreshold = 0.5): Promise<Document[]> {
    try {
      const store = await this.vectorStoreService['getVectorStore'](this.COLLECTION_NAME);

      const retriever = store.asRetriever({
        searchType: 'similarity', // ✅ chỉ dùng similarity
        k,
      });

      const results = await retriever.invoke(query); // ✅ dùng 'invoke' thay cho 'ainvoke'

      // ✅ lọc thủ công theo threshold nếu cần
      const filtered = results.filter((doc: any) => {
        const score = doc?.score ?? 1.0;
        return score >= scoreThreshold;
      });

      return filtered;
    } catch (error) {
      this.logger.error(`Error while searching: ${error.message}`, error.stack);
      throw error;
    }
  }
}
