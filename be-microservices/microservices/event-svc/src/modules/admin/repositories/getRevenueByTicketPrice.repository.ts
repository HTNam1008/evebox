import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { RevenueByTicketPriceData } from "../queries/getRevenueByTicketPrice/getRevenueByTicketPrice-response.dto";

@Injectable()
export class GetRevenueByTicketPriceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getRevenueByTicketPrice(email: string): Promise<Result<RevenueByTicketPriceData[], Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user || user.role_id !== 1)  {
        return Err(new Error('You do not have permission to get revenue by ticket price'));
      }

      const allTicketTypes = await this.prisma.ticketType.findMany({
        where: { deleteAt: null },
        select: {
          id: true,
          price: true,
          quantity: true,
        }
      });

      const allTicketsWithType = await this.prisma.ticket.findMany({
        where: {
          paymentId: { not: null },
          status: 1
        },
        select: {
          price: true,
          TicketQRCode: {
            select: {
              ticketTypeId: true,
            }
          }
        }
      });

      const result: RevenueByTicketPriceData[] = [];

      for (const ticketType of allTicketTypes) {
        const matchedTickets = allTicketsWithType.filter(ticket =>
          ticket.TicketQRCode.some(qr => qr.ticketTypeId === ticketType.id)
        );

        const sold = matchedTickets.length;
        const total = ticketType.quantity || 0;
        const revenue = matchedTickets.reduce((sum, t) => sum + t.price, 0);

        result.push({
          price: ticketType.price,
          total,
          sold,
          conversionRate: total ? sold / total : 0,
          revenue,
        });
      }

      return Ok(result);
    } catch (error) {
      return Err(new Error('Failed to get revenue by ticket price'))
    }
  }
}