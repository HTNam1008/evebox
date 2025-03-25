import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class DeleteTicketTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteTicketType(id: string): Promise<Result<string, Error>> {
    try {
      const ticketType = await this.prisma.ticketType.update({
        where: { id },
        data: { deleteAt: new Date() },
      });
      if (ticketType) {
        return Ok(ticketType.id);
      }
      return Err(new Error('Ticket type not found or could not be deleted'));
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to delete ticket type'));
    }
  }

  async checkAuthor(id: string, userId: string): Promise<Result<boolean, Error>> {
    try {
      const ticketType = await this.prisma.ticketType.findUnique({
        where: { id: id },
        select: { Showing: { select: { Events: { select: { organizerId: true } } } } },
      });

      if ( ticketType && ticketType.Showing.Events.organizerId === userId) {
        return Ok(true);
      }
      return Ok(false);
    } catch (error) {
      return Err(new Error('Failed to check author'));
    }
  }
}