import { Get, Module, Search } from '@nestjs/common';


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
import { GetEventsRepository } from './repositories/getEvents.repository';
import { GetEventsService } from './queries/getEvents/getEvents.service';
import { GetEventsController } from './queries/getEvents/getEvents.controller';
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
import { UpdateEventAdminController } from './commands/UpdateEventAdmin/updateEventAdmin.controller';
import { UpdateEventAdminService } from './commands/UpdateEventAdmin/updateEventAdmin.service';
import { UpdateEventAdminRepository } from './repositories/updateEventAdmin.repository';
import { GetEventOfOrgController } from './queries/getEventOfOrg/getEventOfOrg.controller';
import { GetEventOfOrgService } from './queries/getEventOfOrg/getEventOfOrg.service';
import { GetEventOfOrgRepository } from './repositories/getEventOfOrg.repository';
import { GetEventOfOrgDetailController } from './queries/getEventOfOrgDetail/getEventOfOrgDetail.controller';
import { GetEventOfOrgDetailRepository } from './repositories/getEventOfOrgDetail.repository';
import { GetEventOfOrgDetailService } from './queries/getEventOfOrgDetail/getEventOfOrgDetail.service';
import { AddEventMemberController } from './commands/AddEventMember/addEventMember.controller';
import { AddEventMemberService } from './commands/AddEventMember/addEventMember.service';
import { AddEventMemberRepository } from './repositories/addEventMember.repository';
import { UpdateEventMemberService } from './commands/UpdateEventMember/updateEventMember.service';
import { UpdateEventMemberController } from './commands/UpdateEventMember/updateEventMember.controller';
import { GetEventMembersService } from './queries/getEventMember/getEventMembers.service';
import { GetEventMemberController } from './queries/getEventMember/getEventMember.controller';
import { DeleteEventMemberService } from './commands/DeleteEventMember/deleteEventMember.service';
import { DeleteEventMemberController } from './commands/DeleteEventMember/deleteEventMember.controller';
import { GetEventRolesController } from './queries/getEventRoles/getEventRoles.controller';
import { GetEventRolesService } from './queries/getEventRoles/getEventRoles.service';
import { GetEventRolesRepository } from './repositories/getEventRoles.repository';
import { GetEventRoleByIdController } from './queries/getEventRoleById/getEventRoleById.controller';
import { GetEventRoleByIdService } from './queries/getEventRoleById/getEventRoleById.service';
import { GetEventFDByIdsController } from './queries/getEventFDByIds/getEventFDByIds.controller';
import { GetEventFDByIdsService } from './queries/getEventFDByIds/getEventFDByIds.service';
import { GetEventSpecialManagementController } from './queries/getEventSpecialManagement/getEventSpecialManagement.controller';
import { GetEventSpecialManagementService } from './queries/getEventSpecialManagement/getEventSpecialManagement.service';
import { GetEventSpecialManagementRepository } from './repositories/getEventSpecialManagement.repository';

@Module({
  imports: [ScheduleModule.forRoot(), ImagesModule, LocationModule],
  controllers: [
    // EventController, 
    ClickEventController,
    SearchEventController,

    GetAllCategoriesController,
    GetEventDetailController,
    GetEventDetailRecommendController,
    GetEventFrontDisplayController,
    GetEventFDByIdsController,
    GetRecommendedEventController,

    // For Organizer
    CreateEventController,
    UpdateEventController,
    DeleteEventController,

    GetEventOfOrgController,
    GetEventOfOrgDetailController,
    AddEventMemberController,
    UpdateEventMemberController,
    GetEventMemberController,
    DeleteEventMemberController,

    // For Admin
    UpdateEventAdminController,
    GetEventsController,

    GetEventRolesController,
    GetEventRoleByIdController,
    GetEventSpecialManagementController
  ],
  providers: [
    // UpdateWeeklyService, 

    ClickEventRepository,
    ClickEventService,

    SearchEventService,
    SearchEventRepository,

    GetAllCategoriesRepository,
    GetAllCategoriesService,

    GetEventDetailRecommendRepository,
    GetEventDetailRecommendService,

    GetEventDetailService,
    GetEventDetailRepository,

    GetEventFrontDisplayRepository,
    GetEventFrontDisplayService,

    GetEventFDByIdsService,

    GetRecommendEventService,
    GetRecommendEventRepository,

    // For Organizer
    CreateEventRepository,
    CreateEventService,

    UpdateEventService,
    UpdateEventRepository,

    DeleteEventRepository,
    DeleteEventService,

    GetEventOfOrgService,
    GetEventOfOrgRepository,

    GetEventOfOrgDetailRepository,
    GetEventOfOrgDetailService,

    AddEventMemberService,
    AddEventMemberRepository,
    UpdateEventMemberService,
    GetEventMembersService,
    DeleteEventMemberService,

    // For Admin
    GetEventsService,
    GetEventsRepository,

    UpdateEventAdminService,
    UpdateEventAdminRepository,

    GetEventRolesService,
    GetEventRolesRepository,
    GetEventRoleByIdService,

    GetEventSpecialManagementRepository,
    GetEventSpecialManagementService
  ],
})
export class EventModule {}
