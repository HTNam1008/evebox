import { Module } from '@nestjs/common';
import { GetUserTicketByIdController } from './ticketSendmail/getUserTicketById/getUserTicketById.controller';
import { GetUserTicketByIdService } from './ticketSendmail/getUserTicketById/getUserTicketById.service';
import { getUserTicketRepository } from './ticketSendmail/getUserTicketById/getUserTicket.repository';
// import { TempController } from './temp.controller';

@Module({
  imports: [],
  controllers: [GetUserTicketByIdController],
  providers: [GetUserTicketByIdService,
    getUserTicketRepository,
  ],
})
export class TempModule {}