import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { CheckoutResponseDataType } from '@payos/node/lib/type';
import { PayOSCheckoutDto } from '../commands/payOSCheckout/payOSCheckout.dto';
import { Err, Ok, Result } from 'oxide.ts';
@Injectable()
export class payOSCheckoutRepository {
  constructor(private readonly prisma: PrismaService) {}
  async checkout(checkoutResponseDataType: CheckoutResponseDataType,
    userId: string,
    payOSCheckoutDto: PayOSCheckoutDto
  ): Promise<Result<number, Error>> {
    try{
      const payOSInfo = await this.prisma.payOSInfo.create({
        data: {
          ...checkoutResponseDataType,
          userId: userId,
          showingId: payOSCheckoutDto.showingId,
          ticketTypeId: payOSCheckoutDto.ticketTypeId || null,
          quantity: payOSCheckoutDto.quantity || 0,
          seatId: payOSCheckoutDto.seatId || [],
        }
      });
      if(payOSInfo){
        const paymentInfo = await this.prisma.paymentInfo.create({
          data: {
            method: "PAYOS",
            paymentCode: payOSInfo.orderCode,
          }
        });
        if(paymentInfo){
          return Ok(payOSInfo.orderCode);
        }
      }
      return Err(new Error('Database Error.'));
    }catch(error){
      console.error(error);
      return Err(new Error('Database Error.'));
    }
  }
  async getPayOSOrderCode(){
    const payOSInfo = await this.prisma.payOSInfo.findMany({
      take: 1,
      orderBy: {
        orderCode: 'desc'
      }
    });
    if(payOSInfo){
      return payOSInfo[0].orderCode+1 || Date.now();
    }
  }
  async getAmount(payOSCheckoutDto: PayOSCheckoutDto){
    try{
      const showing = await this.prisma.showing.findUnique({
        where: {
          id: payOSCheckoutDto.showingId
        },
      });
      if (!showing) {
        return 0;
      }
      if (payOSCheckoutDto.seatId.length === 0) {
        if(!payOSCheckoutDto.ticketTypeId){
          return 0;
        }
        const checkSeatAvailability = await this.checkTicketTypeAvailability(payOSCheckoutDto);
        if(!checkSeatAvailability){
          return 0;
        }
        const TicketType = await this.prisma.ticketType.findUnique({
          where: {
            id: payOSCheckoutDto.ticketTypeId
          },
          select: {
            price: true,
            showingId: true,
            maxQtyPerOrder: true,
            minQtyPerOrder: true,
          }
        });
        if (!TicketType) {
          return 0;
        }
        if (TicketType.showingId !== payOSCheckoutDto.showingId) {
          return 0;
        }
        if (TicketType.maxQtyPerOrder < payOSCheckoutDto.quantity || TicketType.minQtyPerOrder > payOSCheckoutDto.quantity) {
          return 0;
        }
        return TicketType.price*payOSCheckoutDto.quantity;
      }
      let amount = 0;
      for (const seat of payOSCheckoutDto.seatId) {
        const checkSeatAvailability = await this.checkSeatAvailability(payOSCheckoutDto);
        if(!checkSeatAvailability){
          return 0;
        }
        const row = await this.prisma.seat.findUnique({
          where: {
            id: seat
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
        if (!ticketType) {
          return 0;
        }
        if (ticketType.showingId !== payOSCheckoutDto.showingId) {
          return 0;
        }
        if (ticketType.maxQtyPerOrder < payOSCheckoutDto.seatId.length || ticketType.minQtyPerOrder > payOSCheckoutDto.seatId.length) {
          return 0;
        }
        amount += ticketType.price;
        return amount;
      }
    }
    catch(error){
      console.error(error);
      return 0;
    }
  }
  async checkSeatAvailability(payOSCheckoutDto: PayOSCheckoutDto){
    try{
      console.log("2");
      const ticket = await this.prisma.ticket.findFirst({
        where: {
          showingId: payOSCheckoutDto.showingId,
          seatId: {
            in: payOSCheckoutDto.seatId
          }
        }
      });
      console.log(ticket);
      if(ticket){
        return false;
      }
      return true;
    }catch(error){
      console.error(error);
      return false;
    }
  }
  async checkTicketTypeAvailability(payOSCheckoutDto: PayOSCheckoutDto){
    try{
      console.log("23");

      const ticketType = await this.prisma.ticketType.findUnique({
        where: {
          id: payOSCheckoutDto.ticketTypeId
        }
      });
      const showingTicketTypeQuantity = await this.prisma.showingTicketTypeQuantity.findFirst({
        where: {
          showingId: payOSCheckoutDto.showingId,
          ticketTypeId: payOSCheckoutDto.ticketTypeId
        }
      });
      console.log(showingTicketTypeQuantity);
      const ticketBuy = await this.prisma.ticket.findMany({
        where: {
          showingId: payOSCheckoutDto.showingId,
          ticketTypeId: payOSCheckoutDto.ticketTypeId
        }
      });
      if(ticketType && ticketBuy && showingTicketTypeQuantity && 
        showingTicketTypeQuantity.quantity >= ticketBuy.length + payOSCheckoutDto.quantity
        && payOSCheckoutDto.quantity <= ticketType.maxQtyPerOrder 
        && payOSCheckoutDto.quantity >= ticketType.minQtyPerOrder
      ){
        console.log('true');
        return true;
        
      }
      return false;
    }catch(error){
      console.error(error);
      return false;
    }
  }
    
}