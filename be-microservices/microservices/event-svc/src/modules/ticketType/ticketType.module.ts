import { Module } from '@nestjs/common';
import { CreateTicketTypeController } from './commands/createTicketType/createTicketType.controller';
import { CreateTicketTypeService } from './commands/createTicketType/createTicketType.service';
import { TicketTypeRepository } from './repositories/ticketType.repository';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [ImagesModule],
  controllers: [
    CreateTicketTypeController,

  ],
  providers: [
    CreateTicketTypeService,
    TicketTypeRepository,
  ],
})
export class TicketTypeModule {}