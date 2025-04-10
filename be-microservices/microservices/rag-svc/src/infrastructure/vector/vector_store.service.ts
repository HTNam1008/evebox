// vector-store.service.ts
import { Injectable } from '@nestjs/common';
import { Document } from 'langchain/document';
import { PGVectorStore } from 'langchain/vectorstores/pgvector';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Pool } from 'pg';

@Injectable()
export class VectorStoreService {
  private pool = new Pool({
    connectionString: process.env.VECTOR_STORE_URL,
  });

  private async getVectorStore(collectionName: string) {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    return await PGVectorStore.initialize(this.pool, embeddings, {
      tableName: collectionName,
    });
  }

  async embedDocuments(documents: Document[], collectionName: string) {
    const store = await this.getVectorStore(collectionName);
    await store.addDocuments(documents);
  }
}
