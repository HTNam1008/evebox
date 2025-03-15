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

@Module({
  controllers: 
    [
      SelectSeatController,
      UnSelectSeatController,
      SubmitFormController,
      
      GetUserTicketController,
      GetRedisSeatController,
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
    ],
})
export class TicketModule {}