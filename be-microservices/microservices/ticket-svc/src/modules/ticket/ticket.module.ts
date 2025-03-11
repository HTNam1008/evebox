import { Module } from '@nestjs/common';
import { SelectSeatController } from './commands/selectSeat/selectSeat.controller';
import { SelectSeatService } from './commands/selectSeat/selectSeat.service';
import { SelectSeatRepository } from './repositories/selectSeat.repository';
import { SubmitFormController } from './commands/submitForm/submitForm.controller';
import { SubmitFormService } from './commands/submitForm/submitForm.service';
import { SubmitFormRepository } from './repositories/submitForm.repository';

@Module({
  controllers: 
    [
      SelectSeatController,
      SubmitFormController,
    ],
  providers: 
    [
      SelectSeatService,
      SelectSeatRepository,

      SubmitFormService,
      SubmitFormRepository,
    ],
})
export class TicketModule {}