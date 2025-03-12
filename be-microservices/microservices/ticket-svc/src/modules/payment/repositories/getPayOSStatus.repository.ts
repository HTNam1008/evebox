import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class GetPayOSStatusRepository {
  constructor(private readonly prisma: PrismaService) {}
  async updatePayOSStatus(orderCode: number, status: string){
    return await this.prisma.payOSInfo.update({
      where: {
        orderCode: orderCode
      },
      data: {
        status: status
      }
    });
  }
  async getPayOSPaymentLink(orderCode: number){
    return await this.prisma.payOSInfo.findUnique({
      where: {
        orderCode: orderCode>>0
      }
    });
  }
  async createTicket(orderCode: number){
    try{
      const payOSInfo = await this.prisma.payOSInfo.findUnique({
        where: {
          orderCode: orderCode>>0
        }
      });
      if (!payOSInfo) {
        return null;
      }
      console.log(payOSInfo);
      
      const paymentInfo = await this.prisma.paymentInfo.findFirst({
        where: {
          paymentCode: orderCode >> 0,
          method: "PAYOS",
        }
      });
      console.log(paymentInfo);
      if (!paymentInfo) {
        return null;
      }
      var { userId, showingId, ticketTypeId, seatId, quantity } = payOSInfo;
      
      const formResponseId = await this.getFormResponseId(showingId, userId);
      if (!formResponseId) {
        return null;
      }
      console.log("spam" + formResponseId);
      if(seatId && seatId.length > 0){
        for(const seat of seatId){
          const row = await this.prisma.seat.findUnique({
            where: {
              id: seat
            },
            select: {
              Row: true,
            }
          });
          if (!row) {
            return null;
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
            return null;
          }
          const getTicketTypeId = await this.prisma.section.findUnique({
            where: {
              id: section.Section.id
            },
            select: {
              ticketTypeId: true,
            }
          });
          const ticketType = await this.prisma.ticketType.findUnique({
            where: {
              id: getTicketTypeId.ticketTypeId
            },
            select: {
              price: true,
              showingId: true,
              maxQtyPerOrder: true,
              minQtyPerOrder: true,
            }
          });
          if (!ticketType) {
            return null;
          }

          const ticket = await this.prisma.ticket.create({
            data: {
              seatId: seat,
              showingId: showingId,
              ticketTypeId: getTicketTypeId.ticketTypeId,
              status: 1,
              price: ticketType.price,
              userId: userId,
              purchasedAt: new Date(),
              paymentId: paymentInfo.id,
              formResponseId: formResponseId
            }
          });
          if (!ticket) {
            return null;
          }
          return ticket;
        }
      }
      else{
        console.log("spam" + quantity + ticketTypeId);
        if(!quantity || !ticketTypeId)return null;
        const ticketType = await this.prisma.ticketType.findUnique({
          where: {
            id: ticketTypeId
          },
          select: {
            price: true,
            showingId: true,
            maxQtyPerOrder: true,
            minQtyPerOrder: true,
          }
        });
        console.log("spam" + ticketType);
        for (let i = 0; i < quantity; i++) {
          const ticket = await this.prisma.ticket.create({
            data: {
              // seatId: seat,
              showingId: showingId,
              ticketTypeId: ticketTypeId,
              status: 1,
              price: ticketType.price,
              userId: userId,
              purchasedAt: new Date(),
              paymentId: paymentInfo.id,
              formResponseId: formResponseId
            }
          });
          if (!ticket) {
            return null;
          }
          return ticket;
        }
      }
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }
  async getFormResponseId(showingId: string, userId: string){
    try{
      const formResponse = await this.prisma.formResponse.findFirst({
        where: {
          userId: userId,
          showingId: showingId,
          Ticket: {
            none: {},
          },
        }
      });
      if (!formResponse) {
        return null;
      }
      return formResponse.id;
    }catch (error) {
      console.error(error);
      return null;
    }
  }
}