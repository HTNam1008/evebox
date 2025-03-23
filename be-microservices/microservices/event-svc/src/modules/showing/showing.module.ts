import { Module, Search } from '@nestjs/common';
import { CreateShowingController } from './commands/createShowing/createShowing.controller';
import { CreateShowingService } from './commands/createShowing/createShowing.service';
import { CreateShowingRepository } from './repositories/createShowing.repository';

@Module({
  controllers: [
    CreateShowingController

  ],
  providers: [
    CreateShowingService,
    CreateShowingRepository,
  ],
})
export class ShowingModule {}