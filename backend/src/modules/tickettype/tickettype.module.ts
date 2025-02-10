import { Module } from '@nestjs/common';
import { TicketTypeService } from './tickettype.service';
import { TicketTypeController } from './tickettype.controller';
import { TicketTypeRepository } from './repositories/tickettype.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

@Module({
  providers: [TicketTypeService, TicketTypeRepository, PrismaService],
  controllers: [TicketTypeController],
  exports: [TicketTypeService],
})
export class TicketTypeModule {}