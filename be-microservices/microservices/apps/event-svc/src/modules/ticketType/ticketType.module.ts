import { Module } from '@nestjs/common';
import { CreateTicketTypeController } from './commands/createTicketType/createTicketType.controller';
import { CreateTicketTypeService } from './commands/createTicketType/createTicketType.service';
import { TicketTypeRepository } from './repositories/ticketType.repository';
import { ImagesModule } from '../images/images.module';
import { DeleteTicketTypeController } from './commands/deleteTicketType/deleteTicketType.controller';
import { DeleteTicketTypeService } from './commands/deleteTicketType/deleteTicketType.service';
import { DeleteTicketTypeRepository } from './repositories/deleteTicketType.repository';
import { UpdateTicketTypeController } from './commands/updateTicketType/updateTicketType.controller';
import { UpdateTicketTypeService } from './commands/updateTicketType/updateTicketType.service';
import { UpdateTicketTypeRepository } from './repositories/updateTicketType.repository';

@Module({
  imports: [ImagesModule],
  controllers: [
    CreateTicketTypeController,
    UpdateTicketTypeController,
    DeleteTicketTypeController
  ],
  providers: [
    CreateTicketTypeService,
    TicketTypeRepository,

    UpdateTicketTypeService,
    UpdateTicketTypeRepository,

    DeleteTicketTypeService,
    DeleteTicketTypeRepository,
  ],
})
export class TicketTypeModule {}