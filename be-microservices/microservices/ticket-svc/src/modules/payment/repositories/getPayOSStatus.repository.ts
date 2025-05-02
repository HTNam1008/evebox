import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

import { generateQRCode, encrypt } from 'src/utils/utils';

@Injectable()
export class GetPayOSStatusRepository {
  constructor(private readonly prisma: PrismaService) { }
  async updatePayOSStatus(orderCode: number, status: string) {
    return await this.prisma.payOSInfo.update({
      where: {
        orderCode: orderCode
      },
      data: {
        status: status
      }
    });
  }
  async getPayOSPaymentLink(orderCode: number) {
    return await this.prisma.payOSInfo.findUnique({
      where: {
        orderCode: orderCode >> 0
      }
    });
  }
  async createTicket(orderCode: number) {
    try {
      const payOSInfo = await this.prisma.payOSInfo.findUnique({
        where: {
          orderCode: orderCode >> 0
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

      await this.prisma.paymentInfo.update({
        where: {
          id: paymentInfo.id
        },
        data: {
          paidAt: new Date(),
        }
      });

      const orderInfo = await this.prisma.orderInfo.findUnique({
        where: {
          id: paymentInfo.orderInfoId
        }
      });
      console.log(orderInfo);
      if (!orderInfo) {
        return null;
      }
      var { userId, showingId, ticketTypeId, seatId, quantity } = orderInfo;

      const formId = await this.prisma.showing.findFirst({
        where: {
          id: showingId,
          deleteAt: null,
        },
        select: {
          formId: true,
          id: true,
        }
      });

      const formResponseId = formId.formId ? await this.getFormResponseId(showingId, userId) : null;
      if (!formResponseId && formId.formId) {
        return null;
      }
      const showing = await this.prisma.showing.findUnique({
        where: { id: showingId }
      });

      if (!showing) {
        return null;
      }
      if (seatId && seatId.length > 0) {
        const showingData = await this.prisma.showing.findUnique({
          where: {
            id: showingId,
            deleteAt: null,
          },
          select: {
            TicketType: {
              select: {
                id: true,
              }
            }
          }
        });
        if (!showingData) {
          return null;
        }
        const ticket = await this.prisma.ticket.create({
          data: {
            showingId: showingId,
            status: 1,
            price: payOSInfo.amount,
            userId: userId,
            paymentId: paymentInfo.id,
            formResponseId: formResponseId || null,
            type: "Ve dien tu",
          }
        });
        if (!ticket) {
          return null;
        }
        for (const seat of seatId) {
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
          const getticketTypeId = await this.prisma.ticketTypeSection.findFirst({
            where: {
              sectionId: section.Section.id,
              ticketTypeId: {
                in: showingData.TicketType.map((item) => item.id)
              }
            },
            select: {
              ticketTypeId: true,
            }
          });
          if (!getticketTypeId) {
            return 0;
          }
          const ticketType = await this.prisma.ticketType.findUnique({
            where: {
              id: getticketTypeId.ticketTypeId
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

          const ticketQRCode = await this.prisma.ticketQRCode.create({
            data: {
              seatId: seat,
              ticketTypeId: getticketTypeId.ticketTypeId,
              ticketId: ticket.id,
              qrCode: "Pending",
              description: "QRCode for ticket",
            }
          });
          if (!ticketQRCode) {
            return null;
          }

          const qrData = {
            ticketQrId: ticketQRCode?.id,
            showingId: showingId,
            ticketTypeId: getticketTypeId.ticketTypeId,
            seatId: seat,
            userId: userId,
            ticketId: ticket.id,
            eventId: showing?.eventId ?? '1'
          }
          const qrContent = JSON.stringify(qrData);
          const encryptedQrContent = encrypt(qrContent);
          const qrCode = await generateQRCode(encryptedQrContent);
          const qrCodeContent = qrCode || "Unknow";

          await this.prisma.ticketQRCode.update({
            where: {
              id: ticketQRCode.id
            },
            data: {
              qrCode: qrCodeContent
            }
          })
        }
        return ticket;
      }
      else {
        if (!quantity || !ticketTypeId || !showingId) return null;
        const ticketType = await this.prisma.ticketType.findUnique({
          where: {
            id: ticketTypeId,
            deleteAt: null,
          },
          select: {
            price: true,
            showingId: true,
            maxQtyPerOrder: true,
            minQtyPerOrder: true,
            quantity: true,
          }
        });
        if (!ticketType) {
          return null;
        }
        const ticket = await this.prisma.ticket.create({
          data: {
            showingId: showingId,
            status: 1,
            price: payOSInfo.amount,
            userId: userId,
            paymentId: paymentInfo.id,
            formResponseId: formResponseId || null,
            type: "Ve dien tu",
          }
        });
        if (!ticket) {
          return null;
        }
        for (let i = 0; i < quantity; i++) {
          const ticketQRCode = await this.prisma.ticketQRCode.create({
            data: {
              ticketId: ticket.id,
              ticketTypeId: ticketTypeId,
              seatId: null,
              qrCode: "Pending",
              description: "QRCode for ticket",
            }
          });
          if (!ticketQRCode) {
            return null;
          }
          const qrData = {
            ticketQrId: ticketQRCode?.id,
            showingId: showingId,
            ticketTypeId: ticketTypeId,
            seatId: null,
            userId: userId,
            ticketId: ticket.id,
            eventId: showing?.eventId ?? '1'
          }
          const qrContent = JSON.stringify(qrData);
          const encryptedQrContent = encrypt(qrContent);
          const qrCode = await generateQRCode(encryptedQrContent);
          const qrCodeContent = qrCode || "Unknow";

          await this.prisma.ticketQRCode.update({
            where: {
              id: ticketQRCode.id
            },
            data: {
              qrCode: qrCodeContent
            }
          })
        }
        return ticket;
      }
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }
  async getFormResponseId(showingId: string, userId: string) {
    try {
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
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}