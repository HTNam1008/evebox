import { Module, Search } from '@nestjs/common';
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

@Module({
  controllers: [
    CreateShowingController,
    CreateFormController,
    UpdateFormController,
    DeleteFormController
  ],
  providers: [
    CreateShowingService,
    CreateShowingRepository,
    CreateFormService,
    CreateFormRepository,
    UpdateFormService,
    UpdateFormRepository,
    DeleteFormService,
    DeleteFormRepository
  ],
})
export class ShowingModule {}