import { Module } from '@nestjs/common';
import { SelectSeatController } from './commands/selectSeat/selectSeat.controller';
import { SelectSeatService } from './commands/selectSeat/selectSeat.service';
import { SelectSeatRepository } from './repositories/selectSeat.repository';

@Module({
  controllers: 
    [
      SelectSeatController,
    ],
  providers: 
    [
      SelectSeatService,
      SelectSeatRepository,

      
    ],
})
export class TicketModule {}