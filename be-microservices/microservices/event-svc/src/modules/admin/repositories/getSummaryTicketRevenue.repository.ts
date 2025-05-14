import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { SummaryTicketRevenueData } from "../queries/getSummaryTicketRevenue/getSummaryTicketRevenue-response.dto";

@Injectable()
export class GetSummaryTicketRevenueRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getSummary(email: string, showingId: string, eventId: number, orgId: string): Promise<Result<SummaryTicketRevenueData, Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user || user.role_id !== 1) {
        return Err(new Error('You do not have permission to get organizer revenue'));
      }

      const showing = await this.prisma.showing.findFirst({
        where: {
          id: showingId,
          deleteAt: null,
          eventId: Number(eventId),
          Events: {
            organizerId: orgId,
            deleteAt: null,
            isApproved: true,
          }
        },
        select: {
          id: true,
          TicketType: true,
          Events: {
            select: {
              id: true,
              title: true
            }
          },
          startTime: true,
          endTime: true
        }
      });

      if (!showing) {
        return Err(new Error('Showing not found'));
      }

      const ticketTypeData = showing.TicketType.map(tt => ({
        ticketTypeId: tt.id,
        typeName: tt.name,
        price: tt.price,
        quantity: tt.quantity || 0
      }));

      const tickets = await this.prisma.ticket.findMany({
        where: {
          showingId,
          status: 1,
          paymentId: {
            not: null
          }
        },
        select: {
          type: true,
          price: true
        }
      });

      const summary = ticketTypeData.map(tt => {
        const matchedTickets = tickets.filter(t => t.type === tt.typeName);
        const sold = matchedTickets.length;
        const revenue = matchedTickets.reduce((sum, t) => sum + t.price, 0);
        return {
          typeName: tt.typeName,
          price: tt.price,
          sold,
          ratio: tt.quantity ? sold / tt.quantity : 0,
          revenue
        };
      });

      const totalRevenue = summary.reduce((sum, s) => sum + s.revenue, 0);
      const ticketsSold = summary.reduce((sum, s) => sum + s.sold, 0);
      const totalTickets = ticketTypeData.reduce((sum, tt) => sum + tt.quantity, 0);

      return Ok({
        eventId: showing.Events.id,
        eventTitle: showing.Events.title,
        showingId: showing.id,
        startTime: showing.startTime,
        endTime: showing.endTime,
        totalRevenue,
        ticketsSold,
        totalTickets,
        percentageSold: totalTickets ? ticketsSold / totalTickets : 0,
        byTicketType: summary.map(({ revenue, ...rest }) => rest)
      });
    } catch (error) {
      return Err(new Error('Failed to get summary of ticket revenue'));
    }
  }
}