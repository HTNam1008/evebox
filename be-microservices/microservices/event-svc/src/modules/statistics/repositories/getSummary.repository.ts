import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { EventSummaryData } from "../queries/getSummary/getSummary-response.dto";

@Injectable()
export class GetEventSummaryRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getEventSummary(showingId: string, organizerId: string): Promise<Result<EventSummaryData, Error>> {
    if (!showingId) {
      return Err(new Error('Showing ID is required'));
    }

    const showings = await this.prisma.showing.findUnique({
      where: {
        id: showingId,
        deleteAt: null,
        // Events: {
        //   organizerId: organizerId,
        //   deleteAt: null,
        // }
      },
      select: {
        id: true,
        TicketType: true,
        Events: {
          select: {
            id: true,
            title: true,
          }
        },
        startTime: true,
        endTime: true,
      }
    });

    if (!showings) {
      return null;
    }

    const ticketTypeData = showings.TicketType.map(tt => ({
      ticketTypeId: tt.id,
      typeName: tt.name,
      price: tt.price,
      showingId: tt.showingId,
      quantity: tt.quantity || 0,
    }));
    if (!ticketTypeData) {
      return null;
    }

    const tickets = await this.prisma.ticket.findMany({
      where: {
        status: 1,
        showingId: showingId,
      },
      select: {
        type: true,
        price: true,
        showingId: true,
      }
    });
    if (!tickets) {
      return null;
    }

    const summary = ticketTypeData.map(tt => {
      const matchedTickets = tickets.filter(
        t => t.type === tt.typeName && t.showingId === tt.showingId
      );

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
      eventId: showings.Events.id,
      eventTitle: showings.Events.title,
      showingId: showings.id,
      startTime: showings.startTime,
      endTime: showings.endTime,
      totalRevenue,
      ticketsSold,
      totalTickets,
      percentageSold: totalTickets ? ticketsSold / totalTickets : 0,
      byTicketType: summary.map(({ revenue, ...rest }) => rest)
    });
  }
}