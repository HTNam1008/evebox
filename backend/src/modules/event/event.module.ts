import { Module } from '@nestjs/common';
import { FrontDisplayController } from './commands/front-display/front-display.controller';
import { FrontDisplayService } from './commands/front-display/front-display.service';
import { SearchController } from './commands/search/search.controller';
import { SearchService } from './commands/search/search.service';
import { EventRepository } from './repositories/event.repository';
import { EventFrontDisplayRepository } from './repositories/event-frontdisplay.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';


@Module({
  controllers: [FrontDisplayController, SearchController],
  providers: [FrontDisplayService, SearchService, 
    EventRepository, EventFrontDisplayRepository,
    PrismaService],
})
export class EventModule {}
