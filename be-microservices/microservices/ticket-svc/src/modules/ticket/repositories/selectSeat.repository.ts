import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { SeatInfo } from '../commands/selectSeat/selectSeat.dto';

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
  async checkSeatAvailability(showingId: string, seatId: SeatInfo[]){
      try{
        for (const seat of seatId) {
          const row = await this.prisma.seat.findUnique({
            where: {
              id: seat.seatId
            },
            select: {
              Row: true,
            }
          });
          if (!row) {
            return 0;
          }
          const section = await this.prisma.row.findUnique({
            where: {
              id: row.Row.id
            },
            select: {
              Section: true,
            }
          });
          if (!section) {
            return 0;
          }
          const ticketTypeId = await this.prisma.section.findUnique({
            where: {
              id: section.Section.id
            },
            select: {
              ticketTypeId: true,
            }
          });
          const ticketType = await this.prisma.ticketType.findUnique({
            where: {
              id: ticketTypeId.ticketTypeId
            },
            select: {
              price: true,
              showingId: true,
              maxQtyPerOrder: true,
              minQtyPerOrder: true,
            }
          });
          if (ticketType.showingId !== showingId) {
            return false;
          }
        }
        const ticket = await this.prisma.ticket.findFirst({
          where: {
            showingId: showingId,
            seatId: {
              in: seatId.map(seat => seat.seatId)
            }
          }
        });
        if(ticket){
          return false;
        }
        return true;
      }catch(error){
        console.error(error);
        return false;
      }
    }
    async checkTicketTypeAvailability(showingId: string, tickettypeId: string, quantity: number){
      try{
        const ticketType = await this.prisma.ticketType.findUnique({
          where: {
            id: tickettypeId
          }
        });
        if(!ticketType){
          return false;
        }
        if (ticketType.showingId !== showingId) {
          return false;
        }
        const showingTicketTypeQuantity = await this.prisma.showingTicketTypeQuantity.findFirst({
          where: {
            showingId: showingId,
            ticketTypeId: tickettypeId
          }
        });
        const ticketBuy = await this.prisma.ticket.findMany({
          where: {
            showingId: showingId,
            ticketTypeId: tickettypeId
          }
        });
        // console.log(ticketBuy.length+quantity);
        // console.log(showingTicketTypeQuantity.quantity);
        if(ticketType && ticketBuy && showingTicketTypeQuantity && 
          showingTicketTypeQuantity.quantity >= ticketBuy.length + quantity
          && quantity <= ticketType.maxQtyPerOrder 
          && quantity >= ticketType.minQtyPerOrder
        ){
          return true;
          
        }
        return false;
      }catch(error){
        console.error(error);
        return false;
      }
    }
}