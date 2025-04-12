// evebox.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EveBoxRepository } from './evebox.repository';
import { EveBoxService } from './evebox.service';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { VectorStoreService } from '../vector/vector_store.service';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  providers: [EveBoxRepository, EveBoxService, VectorStoreService],
})
export class EveboxModule {}
