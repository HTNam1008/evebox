import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { title } from 'process';

@Injectable()
export class getUserTicketRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUserTicket(userId: string){
    try{
      const userTicket = await this.prisma.ticket.findMany({
        where: {
          userId: userId
        },
        select: {
          id: true,
          showingId: true,
          status: true,
          price: true,
          type: true,
          FormResponse: {
            select: {
              FormAnswer: {
                select: {
                  FormInput: {
                    select: {
                      fieldName: true
                    }
                  },
                  value: true,
                }
              }
            }
          },
          Showing: {
            select: {
              startTime: true,
              endTime: true,
              Events: {
                select: {
                  title: true,
                  description: true,
                }
              }
            }
          },
          PaymentInfo: {
            select: {
              paidAt: true,
            }
          },
          TicketQRCode: {
            select: {
              qrCode: true,
              ticketTypeId: true,
              seatId: true,
            }
          }
        }
      });
      if(!userTicket){
        return null;
      }
    }
    catch(e){
      console.error(e);
      return null;
    }
  }
}