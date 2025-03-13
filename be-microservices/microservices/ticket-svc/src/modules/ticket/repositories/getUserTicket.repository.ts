import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { title } from 'process';

@Injectable()
export class getUserTicketRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUserTicket(userId: string){
    try{
      return await this.prisma.ticket.findMany({
        where: {
          userId: userId
        },
        select: {
          id: true,
          seatId: true,
          showingId: true,
          ticketTypeId: true,
          status: true,
          price: true,
          userId: true,
          purchasedAt: true,
          qrCode: true,
          Showing: {
              select:{
              startTime: true,
              endTime: true,
              Events: {
                  select: {
                  title: true,
                  description: true,
                },
              },
            },
          },
          FormResponse: {
            select: {
              answers: {
                select: {
                  formInput:{
                    select:{
                      fieldName: true,
                    }
                  },
                  value: true,
                }
              }
            }
          }
        }
      });
    }
    catch(e){
      console.error(e);
      return null;
    }
  }
}