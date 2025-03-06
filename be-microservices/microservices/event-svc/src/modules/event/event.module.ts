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
import { UpdateWeeklyService } from './tasks/update-weekly.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CategoriesController } from './commands/categories/categories.controller';
import { CategoriesService } from './commands/categories/categories.service';
import { CategoriesRepository } from './repositories/categories.repository';
import { EventCategoriesRepository } from './repositories/event-categories.repository';
import { EventService } from './commands/event/event.service';
import { EventRepository } from './repositories/event.repository';
import { EventController } from './commands/event/event.controller';
import { ImagesModule } from '../images/images.module';
import { LocationModule } from '../location/location.module';


@Module({
  imports: [ScheduleModule.forRoot(), ImagesModule, LocationModule],
  controllers: [EventController, FrontDisplayController, SearchController, EventDetailController, CategoriesController],
  providers: [FrontDisplayService, SearchService, UpdateWeeklyService, 
    EventDetailService, CategoriesService, EventService,
    
    EventFrontDisplayRepository, EventDetailRepository, EventSearchRepository, 
    CategoriesRepository, EventCategoriesRepository, EventRepository,
    ],
})
export class EventModule {}
