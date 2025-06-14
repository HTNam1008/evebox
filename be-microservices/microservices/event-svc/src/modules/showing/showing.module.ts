import { Get, Module, Search } from '@nestjs/common';
import { CreateShowingController } from './commands/createShowing/createShowing.controller';
import { CreateShowingService } from './commands/createShowing/createShowing.service';
import { CreateShowingRepository } from './repositories/createShowing.repository';
import { CreateFormController } from './commands/createForm/createForm.controller';
import { CreateFormService } from './commands/createForm/createForm.service';
import { CreateFormRepository } from './repositories/createForm.repository';
import { UpdateFormController } from './commands/updateForm/updateForm.controller';
import { UpdateFormService } from './commands/updateForm/updateForm.service';
import { UpdateFormRepository } from './repositories/updateForm.repository';
import { DeleteFormController } from './commands/deleteForm/deleteForm.controller';
import { DeleteFormService } from './commands/deleteForm/deleteForm.service';
import { DeleteFormRepository } from './repositories/deleteForm.repository';
import { UpdateShowingController } from './commands/updateShowing/updateShowing.controller';
import { UpdateShowingRepository } from './repositories/updateShowing.repository';
import { UpdateShowingService } from './commands/updateShowing/updateShowing.service';
import { DeleteShowingController } from './commands/deleteShowing/deleteShowing.controller';
import { DeleteShowingService } from './commands/deleteShowing/deleteShowing.service';
import { DeleteShowingRepository } from './repositories/deleteShowing.repository';
import { GetAllShowingDetailOfEventController } from './queries/getAllShowingDetailOfEvent/getAllShowingDetailOfEvent.controller';
import { GetAllShowingDetailOfEventService } from './queries/getAllShowingDetailOfEvent/getAllShowingDetailOfEvent.service';
import { GetAllShowingDetailOfEventRepository } from './repositories/getAllShowingDetailOfEvent.repository';
import { GetAllFormsController } from './queries/getAllForms/getAllForms.controller';
import { GetAllFormsService } from './queries/getAllForms/getAllForms.service';
import { GetAllFormsRepository } from './repositories/getAllForms.repository';
import { GetFormController } from './queries/getForm/getForm.controller';
import { GetFormService } from './queries/getForm/getForm.service';
import { GetFormRepository } from './repositories/getForm.repository';
import { ConnectFormController } from './commands/connectShowingToForm/connectShowingToForm.controller';
import { ConnectFormService } from './commands/connectShowingToForm/connectShowingToForm.service';
import { ConnectFormRepository } from './repositories/connectShowingToForm.repository';
import { GetAllShowingTimeOfEventController } from './queries/getAllShowingTimeOfEvent/getAllShowingTimeOfEvent.controller';
import { GetAllShowingTimeOfEventService } from './queries/getAllShowingTimeOfEvent/getAllShowingTimeOfEvent.service';
import { GetAllShowingTimeOfEventRepository } from './repositories/getAllShowingTimeOfEvent.repository';
import { GetShowingsController } from './queries/getShowings/getShowings.controller';
import { GetShowingsService } from './queries/getShowings/getShowings.service';
import { GetShowingsRepository } from './repositories/getShowings.repository';
import { GetShowingAdminDetailController } from './queries/getShowingDetail/getShowingAdminDetail.controller';
import { GetShowingAdminDetailService } from './queries/getShowingDetail/getShowingAdminDetail.service';
import { GetShowingAdminDetailRepository } from './repositories/getShowingAdminDetail.repository';
import { GetTicketDetailOfShowingController } from './queries/getTicketDetailOfShowing/getTicketDetailOfShowing.controller';
import { GetTicketDetailOfShowingService } from './queries/getTicketDetailOfShowing/getTicketDetailOfShowing.service';
import { GetTicketDetailOfShowingRepository } from './repositories/getTicketDetailOfShowing.repository';

@Module({
  controllers: [
    // Admin
    GetShowingAdminDetailController,
    GetTicketDetailOfShowingController,
    GetShowingsController,

    GetAllFormsController,
    GetFormController,
    ConnectFormController,
    GetAllShowingTimeOfEventController,

    CreateFormController,
    UpdateFormController,
    DeleteFormController,
    GetAllShowingDetailOfEventController,
    CreateShowingController,
    UpdateShowingController,
    DeleteShowingController,
    
  ],
  providers: [
    CreateShowingService,
    CreateShowingRepository,
    CreateFormService,
    CreateFormRepository,
    UpdateFormService,
    UpdateFormRepository,
    DeleteFormService,
    DeleteFormRepository,
    GetAllFormsService,
    GetAllFormsRepository,
    GetFormService,
    GetFormRepository,
    ConnectFormService,
    ConnectFormRepository,

    UpdateShowingRepository,
    UpdateShowingService,

    DeleteShowingRepository,
    DeleteShowingService,

    GetAllShowingDetailOfEventService,
    GetAllShowingDetailOfEventRepository,

    GetAllShowingTimeOfEventService,
    GetAllShowingTimeOfEventRepository,

    // Admin
    GetShowingAdminDetailService,
    GetShowingAdminDetailRepository,

    GetTicketDetailOfShowingService,
    GetTicketDetailOfShowingRepository,

    GetShowingsService,
    GetShowingsRepository
  ],
})
export class ShowingModule {}