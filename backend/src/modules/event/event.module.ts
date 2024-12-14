import { Module } from '@nestjs/common';
import { FrontDisplayController } from './commands/front-display/front-display.controller';
import { FrontDisplayService } from './commands/front-display/front-display.service';
import { SearchController } from './commands/search/search.controller';
import { SearchService } from './commands/search/search.service';
import { EventSearchRepository } from './repositories/event-search.repository';
import { EventFrontDisplayRepository } from './repositories/event-frontdisplay.repository';
import { EventDetailRepository } from './repositories/event-detail.repository';
import { EventDetailService } from './commands/detail/detail.service';
import { EventDetailController } from './commands/detail/detail.controller';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';


@Module({
  controllers: [FrontDisplayController, SearchController, EventDetailController],
  providers: [FrontDisplayService, SearchService, EventDetailService,
    EventSearchRepository, EventFrontDisplayRepository, EventDetailRepository,
    PrismaService],
})
export class EventModule {}
