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
          // FormResponse: {
          //   select: {
          //     FormAnswer: {
          //       select: {
          //         FormInput: {
          //           select: {
          //             fieldName: true
          //           }
          //         },
          //         value: true,
          //       }
          //     }
          //   }
          // },
          Showing: {
            select: {
              startTime: true,
              endTime: true,
              Events: {
                select: {
                  title: true,
                  // description: true,
                  venue: true,
                  locations: {
                    select: {
                        id: true,
                        street: true,
                        ward: true,
                        districtId: true,
                        createdAt: true,
                        districts: {
                            select: {
                                name: true,
                                province: { select: { name: true } },
                            },
                        },
                    },
                },
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
      // Xử lý địa chỉ
      // const { street, ward, districts } = event.locations ?? {};
      // const districtName = districts?.name || '';
      // const provinceName = districts?.province?.name || '';
      // const locationsString = `${street || ''}, ${ward || ''}, ${districtName}, ${provinceName}`;
      const formatUserTicket = userTicket.map(ticket => {
        const { street, ward, districts } = ticket.Showing?.Events?.locations ?? {};
        const districtName = districts?.name || '';
        const provinceName = districts?.province?.name || '';
        const locationsString = `${street || ''}, ${ward || ''}, ${districtName}, ${provinceName}`;
        return {
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
                venue: ticket.Showing.Events?.venue || '',
                locationsString: locationsString || '',
              },
            }
            : undefined,
          };
        }
      );
      return formatUserTicket;
    }
    catch (e) {
      console.error(e);
      return null;
    }
  }
}