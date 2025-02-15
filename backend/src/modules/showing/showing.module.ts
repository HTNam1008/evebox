import { Module } from '@nestjs/common';
import { ShowingController } from './commands/showing/showing.controller';
import { ShowingService } from './commands/showing/showing.service';
import { ShowingRepository } from './repositories/showing.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { TicketTypeController } from './commands/tickettype/tickettype.controller';
import { TicketTypeService } from './commands/tickettype/tickettype.service';
import { TicketTypeRepository } from './repositories/tickettype.repository';
@Module({
  controllers: [ShowingController, TicketTypeController],
  providers: [ShowingService,
    ShowingRepository,
    TicketTypeService,
    TicketTypeRepository,
    PrismaService],
})
export class ShowingModule {}