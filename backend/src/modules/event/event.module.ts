import { Module } from '@nestjs/common';
import { FrontDisplayController } from './commands/front-display/front-display.controller';
import { FrontDisplayService } from './commands/front-display/front-display.service';
import { EventRepository } from './repositories/event.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';


@Module({
  controllers: [FrontDisplayController],
  providers: [FrontDisplayService, EventRepository, PrismaService],
})
export class EventModule {}
