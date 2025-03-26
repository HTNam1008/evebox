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
import { GetAllFormsController } from './commands/getAllForms/getAllForms.controller';
import { GetAllFormsService } from './commands/getAllForms/getAllForms.service';
import { GetAllFormsRepository } from './repositories/getAllForms.repository';
import { GetFormController } from './commands/getForm/getForm.controller';
import { GetFormService } from './commands/getForm/getForm.service';
import { GetFormRepository } from './repositories/getForm.repository';
import { ConnectFormController } from './commands/connectShowingToForm/connectShowingToForm.controller';
import { ConnectFormService } from './commands/connectShowingToForm/connectShowingToForm.service';
import { ConnectFormRepository } from './repositories/connectShowingToForm.repository';

@Module({
  controllers: [
    GetAllFormsController,
    GetFormController,
    GetAllShowingDetailOfEventController,
    ConnectFormController,

    CreateFormController,
    UpdateFormController,
    DeleteFormController,
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
  ],
})
export class ShowingModule {}