import { Module, Search } from '@nestjs/common';


// import { UpdateWeeklyService } from './tasks/update-weekly.service';
import { ScheduleModule } from '@nestjs/schedule';

// import { EventCategoriesRepository } from './repositories/event-categories.repository';
// import { EventService } from './commands/event/event.service';
// import { EventRepository } from './repositories/event.repository';
// import { EventController } from './commands/event/event.controller';
import { ImagesModule } from '../images/images.module';
import { LocationModule } from '../location/location.module';
import { ClickEventController } from './commands/ClickEvent/ClickEvent.controller';
import { ClickEventRepository } from './repositories/clickEvent.repository';
import { ClickEventService } from './commands/ClickEvent/clickEvent.service';
// import { SearchEventController } from './commands/SearchEvent/searchEvent.controller';
// import { SearchEventService } from './commands/SearchEvent/searchEvent.service';
// import { SearchEventRepository } from './repositories/searchEvent.repository';
import { GetAllCategoriesController } from './queries/getAllCategories/getAllCategories.controller';
import { GetEventDetailController } from './queries/getEventDetail/getEventDetail.controller';
import { GetAllCategoriesRepository } from './repositories/getAllCategories.repository';
import { GetAllCategoriesService } from './queries/getAllCategories/getAllCategories.service';
// import { GetEventDetailRecommendRepository } from './repositories/getEventDetailRecommend.repository';
// import { GetEventDetailRecommendService } from './queries/getEventDetailRecommend/getEventDetailRecommend.service';
// import { GetEventDetailRecommendController } from './queries/getEventDetailRecommend/getEventDetailRecommend.controller';
import { GetEventDetailService } from './queries/getEventDetail/getEventDetail.service';
import { GetEventDetailRepository } from './repositories/getEventDetail.repository';
// import { GetEventFrontDisplayRepository } from './repositories/getEventFrontDisplay.repository';
// import { GetEventFrontDisplayService } from './queries/getEventFrontDisplay/getEventFrontDisplay.service';
// import { GetEventFrontDisplayController } from './queries/getEventFrontDisplay/getEventFrontDisplay.controller';
// import { GetRecommendEventService } from './queries/getRecommendEvent/getRecommendEvent.service';
// import { GetRecommendEventRepository } from './repositories/getRecommendEvent.repository';
// import { GetRecommendedEventController } from './queries/getRecommendEvent/getRecommendEvent.controller';


@Module({
  imports: [ScheduleModule.forRoot(), ImagesModule, LocationModule],
  controllers: [
    // EventController, 
    ClickEventController,
    // SearchEventController,

    GetAllCategoriesController,
    GetEventDetailController,
    // GetEventDetailRecommendController,
    // GetEventFrontDisplayController,
    // GetRecommendedEventController,
    ],
  providers: [
    // UpdateWeeklyService, 

    // EventService,
    // EventCategoriesRepository, 
    // EventRepository,

    ClickEventRepository,
    ClickEventService,

    // SearchEventService,
    // SearchEventRepository,

    GetAllCategoriesRepository,
    GetAllCategoriesService,

    // GetEventDetailRecommendRepository,
    // GetEventDetailRecommendService,

    GetEventDetailService,
    GetEventDetailRepository,

    // GetEventFrontDisplayRepository,
    // GetEventFrontDisplayService,

    // GetRecommendEventService,
    // GetRecommendEventRepository,
    ],
})
export class EventModule {}
