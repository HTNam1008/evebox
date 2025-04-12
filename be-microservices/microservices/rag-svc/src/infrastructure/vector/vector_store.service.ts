// vector-store.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Document } from 'langchain/document';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Pool } from 'pg';

@Injectable()
export class VectorStoreService {
  private readonly logger = new Logger(VectorStoreService.name);
  private readonly pool = new Pool({
    connectionString: process.env.VECTOR_STORE_URL,
  });

  private async getVectorStore(collectionName: string): Promise<PGVectorStore> {
    try {
      console.log(`🔗 Connecting to vector store at ${process.env.VECTOR_STORE_URL}...`)
      console.log(`openAIApiKey: ${process.env.OPENAI_API_KEY}`);
      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      const store = await PGVectorStore.initialize(embeddings, {
        postgresConnectionOptions: {
          connectionString: process.env.VECTOR_STORE_URL,
        },
        tableName: collectionName,
      });

      return store;
    } catch (error) {
      this.logger.error(`❌ Failed to initialize vector store: ${error.message}`);
      throw error;
    }
  }

  async embedDocuments(documents: Document[], collectionName: string): Promise<void> {
    const BATCH_SIZE = 10;
    const DELAY_MS = 1500; // tăng delay giữa các batch một chút

  
    try {
      const store = await this.getVectorStore(collectionName);
  
      for (let i = 0; i < documents.length; i += BATCH_SIZE) {
        const batch = documents.slice(i, i + BATCH_SIZE);
        this.logger.log(`🚀 Embedding batch ${i / BATCH_SIZE + 1} (${batch.length} documents)...`);
        await store.addDocuments(batch);
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS)); // delay nhỏ
      }
  
      this.logger.log(`✅ Successfully embedded ${documents.length} documents to collection '${collectionName}'.`);
    } catch (error) {
      console.error(`❌ Error embedding documents: ${error.message}`);
      this.logger.error(`❌ Failed to embed documents: ${error.message}`);
    }
  }
  
}