import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { title } from 'process';

@Injectable()
export class getUserTicketRepository {
  constructor(private readonly prisma: PrismaService) { }
  async getUserTicket(userId: string) {
    try {
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
      if (!userTicket) {
        return null;
      }

      return userTicket.map(ticket => ({
        id: ticket.id,
        showingId: ticket.showingId,
        status: ticket.status,
        type: ticket.type,
        price: ticket.price,
        PaymentInfo: ticket.PaymentInfo ?? undefined,
        TicketQRCode: ticket.TicketQRCode ?? [],
        Showing: ticket.Showing
          ? {
            startTime: ticket.Showing.startTime,
            endTime: ticket.Showing.endTime,
            Events: {
              title: ticket.Showing.Events?.title || '',
              description: ticket.Showing.Events?.description || '',
            },
          }
          : undefined,
        FormResponse: ticket.FormResponse
          ? {
            answers: ticket.FormResponse.FormAnswer.map(answer => ({
              formInput: {
                fieldName: answer.FormInput.fieldName,
              },
              value: answer.value,
            })),
          }
          : undefined,
      }));
    }
    catch (e) {
      console.error(e);
      return null;
    }
  }
}