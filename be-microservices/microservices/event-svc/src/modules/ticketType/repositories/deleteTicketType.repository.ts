import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteTicketTypeDto } from '../commands/deleteTicketType/deleteTicketType.dto';

@Injectable()
export class DeleteTicketTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteTicketType(id: string): Promise<Result<string, Error>> {
    try {
      const ticketType = await this.prisma.ticketType.delete({
        where: { id },
      });
      if (ticketType) {
        return Ok(ticketType.id);
      }
      return Err(new Error('Ticket type not found or could not be deleted'));
    } catch (error) {
      return Err(new Error('Failed to delete ticket type'));
    }
  }
}