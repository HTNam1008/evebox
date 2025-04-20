// evebox.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EveBoxRepository } from './evebox.repository';
import { EveBoxService } from './evebox.service';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { VectorStoreService } from '../vector/vector_store.service';
import { VectorStoreCohereService } from '../vector/vector_store.cohere';
import { VectorStoreGeminiService } from '../vector/vector_store.gemini';
import { EmbeddingWrapperService } from '../vector/embedding_wrapper.service';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  providers: [EveBoxRepository, EveBoxService, 
    EmbeddingWrapperService,
    VectorStoreCohereService,
    VectorStoreService,
    VectorStoreGeminiService,
  ],
})
export class EveboxModule {}
