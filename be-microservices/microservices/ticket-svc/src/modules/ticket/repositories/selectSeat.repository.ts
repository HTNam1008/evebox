import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class SelectSeatRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getTicketQuantity(showingId: string, tickettypeId: string){
    const showingTicketTypeQuantity =  await this.prisma.showingTicketTypeQuantity.findFirst(
      {
        where: {
          showingId: showingId,
          ticketTypeId: tickettypeId
        },
        select: {
          quantity: true,
        }
      }
    );
    const quantity = showingTicketTypeQuantity ? showingTicketTypeQuantity.quantity : 0;
    const saleTicket = await this.prisma.ticket.findMany({
      where: {
        showingId: showingId,
        ticketTypeId: tickettypeId
      }
    });
    const saleQuantity = saleTicket.length;
    return {quantity: quantity - saleQuantity};
  }
}