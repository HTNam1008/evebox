import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { SeatInfo } from '../commands/selectSeat/selectSeat.dto';

@Injectable()
export class SelectSeatRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getTicketQuantity(showingId: string, tickettypeId: string){
    const showingTicketTypeQuantity =  await this.prisma.ticketType.findFirst(
      {
        where: {
          showingId: showingId,
          id: tickettypeId
        },
        select: {
          quantity: true,
        }
      }
    );
    const quantity = showingTicketTypeQuantity ? showingTicketTypeQuantity.quantity : 0;
    const saleTicket = await this.prisma.ticketQRCode.findMany({
      where: {
        ticketTypeId: tickettypeId
      }
    });
    const saleQuantity = saleTicket.length;
    return {quantity: quantity - saleQuantity};
  }
  async checkSeatAvailability(showingId: string, seatId: SeatInfo[]){
    try{
      const seatStatus = await this.prisma.seatStatus.findMany({
        where: {
          showingId: showingId,
          seatId: {
            in: seatId.map(seat => seat.seatId)
          }
        },
        select: {
          status: true
        }
      });
      if (seatStatus.length !== seatId.length){
        return false;
      }
      for (const seat of seatStatus){
        if(seat.status !== 1){
          return false;
        }
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
      const showingTicketTypeQuantity = await this.getTicketQuantity(showingId, tickettypeId);
      const ticketSold = await this.prisma.ticketQRCode.findMany({
        where: {
          ticketTypeId: tickettypeId
        }
      });
      // console.log(ticketBuy.length+quantity);
      // console.log(showingTicketTypeQuantity.quantity);
      if(ticketType && ticketSold && showingTicketTypeQuantity && 
        showingTicketTypeQuantity.quantity >= ticketSold.length + quantity
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