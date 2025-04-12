// evebox.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EveBoxRepository } from './evebox.repository';
import { VectorStoreService } from 'src/infrastructure/vector/vector_store.service';
import { Document } from 'langchain/document';
import { VectorStoreCohereService } from '../vector/vector_store.cohere';

@Injectable()
export class EveBoxService {
  private readonly logger = new Logger(EveBoxService.name);

  constructor(
    private readonly eveBoxRepo: EveBoxRepository,
    private readonly vectorStore: VectorStoreService,
    private readonly vectorStoreCohere: VectorStoreCohereService, // Sử dụng Cohere cho vector store
  ) {}

  @Cron('30 16 * * 6') // Mỗi thứ 2 lúc 0h
  async handleWeeklyEventEmbedding() {
    this.logger.log('⏳ Bắt đầu sync event vào vector store...');

    const events = await this.eveBoxRepo.getAllEvents();
    if (!events.length) {
      this.logger.warn('⚠️ Không có event nào để embed.');
      return;
    }

    const documents: Document[] = events.map((event) => {
      const metadata = { ...event };
      const pageContent = Object.entries(event)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n');

      return new Document({ pageContent, metadata });
    });

    await this.vectorStoreCohere.embedDocuments(documents, 'eveboxEvents');

    this.logger.log(`✅ Đã embed ${documents.length} events vào vector store.`);
  }
}
