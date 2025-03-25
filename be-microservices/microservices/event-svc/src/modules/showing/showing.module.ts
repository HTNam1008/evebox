import { Get, Module, Search } from '@nestjs/common';
import { CreateShowingController } from './commands/createShowing/createShowing.controller';
import { CreateShowingService } from './commands/createShowing/createShowing.service';
import { CreateShowingRepository } from './repositories/createShowing.repository';
import { UpdateShowingController } from './commands/updateShowing/updateShowing.controller';
import { UpdateShowingRepository } from './repositories/updateShowing.repository';
import { UpdateShowingService } from './commands/updateShowing/updateShowing.service';
import { DeleteShowingController } from './commands/deleteShowing/deleteShowing.controller';
import { DeleteShowingService } from './commands/deleteShowing/deleteShowing.service';
import { DeleteShowingRepository } from './repositories/deleteShowing.repository';
import { GetAllShowingDetailOfEventController } from './queries/getAllShowingDetailOfEvent/getAllShowingDetailOfEvent.controller';
import { GetAllShowingDetailOfEventService } from './queries/getAllShowingDetailOfEvent/getAllShowingDetailOfEvent.service';
import { GetAllShowingDetailOfEventRepository } from './repositories/getAllShowingDetailOfEvent.repository';

@Module({
  controllers: [
    CreateShowingController,
    UpdateShowingController,
    DeleteShowingController,
    
    GetAllShowingDetailOfEventController,
  ],
  providers: [
    CreateShowingService,
    CreateShowingRepository,

    UpdateShowingRepository,
    UpdateShowingService,

    DeleteShowingRepository,
    DeleteShowingService,

    GetAllShowingDetailOfEventService,
    GetAllShowingDetailOfEventRepository,
  ],
})
export class ShowingModule {}