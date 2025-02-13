import { Module } from '@nestjs/common';
import { ShowingController } from './commands/showing/showing.controller';
import { ShowingService } from './commands/showing/showing.service';
import { ShowingRepository } from './repositories/showing.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
@Module({
  controllers: [ShowingController, ],
  providers: [ShowingService,
    ShowingRepository,
    PrismaService],
})
export class ShowingModule {}