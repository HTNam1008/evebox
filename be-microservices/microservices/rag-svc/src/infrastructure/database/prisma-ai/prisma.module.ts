import { Module } from '@nestjs/common';
import { PrismaAIService } from './prisma.service';

@Module({
  providers: [PrismaAIService],
  exports: [PrismaAIService],
})
export class PrismaAIModule {}