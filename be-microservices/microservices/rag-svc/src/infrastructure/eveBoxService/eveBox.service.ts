// evebox.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EveBoxRepository } from './evebox.repository';
import { VectorStoreService } from 'src/infrastructure/vector/vector_store.service';
import { Document } from 'langchain/document';
import { VectorStoreCohereService } from '../vector/vector_store.cohere';
import { VectorStoreGeminiService } from '../vector/vector_store.gemini';
import { transformEventsToDocuments, transformEventsDescriptionToDocuments } from 'src/utils/transform_documents';

@Injectable()
export class EveBoxService {
  private readonly logger = new Logger(EveBoxService.name);

  constructor(
    private readonly eveBoxRepo: EveBoxRepository,
    private readonly vectorStoreCohere: VectorStoreCohereService, // Sử dụng Cohere cho vector store
    private readonly vectorStoreGemini: VectorStoreGeminiService, // Sử dụng Gemini cho vector store
  ) {}

  @Cron('45 0 * * 1') // Mỗi thứ 2 lúc 0h
  async handleWeeklyEventEmbedding() {
    this.logger.log('⏳ Bắt đầu sync event vào vector store...');

    const events = await this.eveBoxRepo.getAllEvents();
    if (!events.length) {
      this.logger.warn('⚠️ Không có event nào để embed.');
      return;
    }

    const documents: Document[] = transformEventsDescriptionToDocuments(events);

    await this.vectorStoreCohere.embedDocuments(documents, 'eveboxEventsDescription');
    await this.vectorStoreGemini.embedDocuments(documents, 'eveboxEventsDescription');

    this.logger.log(`✅ Đã embed ${documents.length} events vào vector store.`);
  }
}
