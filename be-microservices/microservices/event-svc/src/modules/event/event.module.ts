import { Module, Search } from '@nestjs/common';


// import { UpdateWeeklyService } from './tasks/update-weekly.service';
import { ScheduleModule } from '@nestjs/schedule';

// import { EventCategoriesRepository } from './repositories/event-categories.repository';
// import { EventService } from './commands/event/event.service';
// import { EventRepository } from './repositories/event.repository';
// import { EventController } from './commands/event/event.controller';
import { ImagesModule } from '../images/images.module';
import { LocationModule } from '../location/location.module';
import { ClickEventController } from './commands/clickEvent/ClickEvent.controller';
import { ClickEventRepository } from './repositories/clickEvent.repository';
import { ClickEventService } from './commands/clickEvent/clickEvent.service';
import { SearchEventController } from './commands/searchEvent/searchEvent.controller';
import { SearchEventService } from './commands/searchEvent/searchEvent.service';
import { SearchEventRepository } from './repositories/searchEvent.repository';
import { GetAllCategoriesController } from './queries/getAllCategories/getAllCategories.controller';
import { GetEventDetailController } from './queries/getEventDetail/getEventDetail.controller';
import { GetAllCategoriesRepository } from './repositories/getAllCategories.repository';
import { GetAllCategoriesService } from './queries/getAllCategories/getAllCategories.service';
import { GetEventDetailRecommendRepository } from './repositories/getEventDetailRecommend.repository';
import { GetEventDetailRecommendService } from './queries/getEventDetailRecommend/getEventDetailRecommend.service';
import { GetEventDetailRecommendController } from './queries/getEventDetailRecommend/getEventDetailRecommend.controller';
import { GetEventDetailService } from './queries/getEventDetail/getEventDetail.service';
import { GetEventDetailRepository } from './repositories/getEventDetail.repository';
import { GetEventFrontDisplayRepository } from './repositories/getEventFrontDisplay.repository';
import { GetEventFrontDisplayService } from './queries/getEventFrontDisplay/getEventFrontDisplay.service';
import { GetEventFrontDisplayController } from './queries/getEventFrontDisplay/getEventFrontDisplay.controller';
import { GetRecommendEventService } from './queries/getRecommendEvent/getRecommendEvent.service';
import { GetRecommendEventRepository } from './repositories/getRecommendEvent.repository';
import { GetRecommendedEventController } from './queries/getRecommendEvent/getRecommendEvent.controller';
import { CreateEventController } from './commands/createEvent/createEvent.controller';
import { CreateEventRepository } from './repositories/createEvent.repository';
import { CreateEventService } from './commands/createEvent/createEvent.service';
import { DeleteEventController } from './commands/deleteEvent/deleteEvent.controller';
import { DeleteEventRepository } from './repositories/deleteEvent.repository';
import { DeleteEventService } from './commands/deleteEvent/deleteEvent.service';
import { UpdateEventController } from './commands/updateEvent/updateEvent.controller';
import { UpdateEventService } from './commands/updateEvent/updateEvent.service';
import { UpdateEventRepository } from './repositories/updateEvent.repository';


@Module({
  imports: [ScheduleModule.forRoot(), ImagesModule, LocationModule],
  controllers: [
    // EventController, 
    ClickEventController,
    SearchEventController,
    CreateEventController,
    UpdateEventController,
    DeleteEventController,

    GetAllCategoriesController,
    GetEventDetailController,
    GetEventDetailRecommendController,
    GetEventFrontDisplayController,
    GetRecommendedEventController,
    ],
  providers: [
    // UpdateWeeklyService, 

    ClickEventRepository,
    ClickEventService,

    SearchEventService,
    SearchEventRepository,

    CreateEventRepository,
    CreateEventService,

    UpdateEventService,
    UpdateEventRepository,

    DeleteEventRepository,
    DeleteEventService,

    GetAllCategoriesRepository,
    GetAllCategoriesService,

    GetEventDetailRecommendRepository,
    GetEventDetailRecommendService,

    GetEventDetailService,
    GetEventDetailRepository,

    GetEventFrontDisplayRepository,
    GetEventFrontDisplayService,

    GetRecommendEventService,
    GetRecommendEventRepository,
    ],
})
export class EventModule {}
