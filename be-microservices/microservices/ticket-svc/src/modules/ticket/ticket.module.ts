import { Get, Module } from '@nestjs/common';
import { SelectSeatController } from './commands/selectSeat/selectSeat.controller';
import { SelectSeatService } from './commands/selectSeat/selectSeat.service';
import { SelectSeatRepository } from './repositories/selectSeat.repository';
import { SubmitFormController } from './commands/submitForm/submitForm.controller';
import { SubmitFormService } from './commands/submitForm/submitForm.service';
import { SubmitFormRepository } from './repositories/submitForm.repository';
import { GetUserTicketController } from './queries/getUserTicket/getUserTicket.controller';
import { GetRedisSeatController } from './queries/getRedisSeat/getRedisSeat.controller';
import { GetUserTicketService } from './queries/getUserTicket/getUserTicket.service';
import { getUserTicketRepository } from './repositories/getUserTicket.repository';
import { GetRedisSeatService } from './queries/getRedisSeat/getRedisSeat.service';
import { UnSelectSeatController } from './commands/unSelectSeat/unSelectSeat.controller';
import { UnSelectSeatService } from './commands/unSelectSeat/unSelectSeat.service';
import { getRedisSeatRepository } from './repositories/getRedisSeat.repository';
import { GetUserTicketByIdService } from './queries/getUserTicketById/getUserTicketById.service';
import { GetUserTicketByIdController } from './queries/getUserTicketById/getUserTicketById.controller';
import { CheckInTicketRepository } from './repositories/checkInTicket.repository';
import { CheckInTicketService } from './commands/checkinTicket/checkInTicket.service';
import { CheckInTicketController } from './commands/checkinTicket/checkInTicket.controller';
import { CheckInTicketByQrRepository } from './repositories/checkInTicketByQr.repository';
import { CheckInTicketByQrService } from './commands/checkInTicketByQr/checkInTicketByQr.service';
import { CheckInTicketByQrController } from './commands/checkInTicketByQr/checkInTicketByQr.controller';
import { GetCheckedInTicketsRepository } from './repositories/getCheckedInTickets.repository';
import { GetCheckedInTicketsService } from './queries/getCheckedInTickets/getCheckedInTickets.service';
import { GetCheckedInTicketsController } from './queries/getCheckedInTickets/getCheckedInTickets.controller';

@Module({
  controllers: 
    [
      SelectSeatController,
      UnSelectSeatController,
      SubmitFormController,
      
      GetUserTicketController,
      GetRedisSeatController,
      GetUserTicketByIdController,
      CheckInTicketController,
      CheckInTicketByQrController,
      GetCheckedInTicketsController
    ],
  providers: 
    [
      SelectSeatService,
      SelectSeatRepository,

      UnSelectSeatService,

      SubmitFormService,
      SubmitFormRepository,

      GetUserTicketService,
      getUserTicketRepository,

      GetRedisSeatService,
      getRedisSeatRepository,

      GetUserTicketByIdService,

      CheckInTicketService,
      CheckInTicketRepository,

      CheckInTicketByQrService,
      CheckInTicketByQrRepository,

      GetCheckedInTicketsService,
      GetCheckedInTicketsRepository
    ],
})
export class TicketModule {}