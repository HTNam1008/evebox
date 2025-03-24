import { Module } from '@nestjs/common';
import { CreateTicketTypeController } from './commands/createTicketType/createTicketType.controller';
import { CreateTicketTypeService } from './commands/createTicketType/createTicketType.service';
import { TicketTypeRepository } from './repositories/ticketType.repository';
import { ImagesModule } from '../images/images.module';
import { DeleteTicketTypeController } from './commands/deleteTicketType/deleteTicketType.controller';
import { DeleteTicketTypeService } from './commands/deleteTicketType/deleteTicketType.service';
import { DeleteTicketTypeRepository } from './repositories/deleteTicketType.repository';

@Module({
  imports: [ImagesModule],
  controllers: [
    CreateTicketTypeController,

    DeleteTicketTypeController
  ],
  providers: [
    CreateTicketTypeService,
    TicketTypeRepository,

    DeleteTicketTypeService,
    DeleteTicketTypeRepository,
  ],
})
export class TicketTypeModule {}