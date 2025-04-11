import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { SummaryQueryDto } from "../queries/getSummary/getSummary.dto";
import { EventSummaryResponse } from "../queries/getSummary/getSummary-response.dto";

@Injectable()
export class GetEventSummaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEventSummary(eventId: number, dto: SummaryQueryDto, organizerId: string): Promise<Result<EventSummaryResponse, Error>> {
    const event = await this.prisma.events.findUnique({
      where: {
        id: Number(eventId),
        // organizerId: organizerId
      }
    });

    if (!event) {
      console.log('not found event');
      return null;
    }
    
    const whereShowing: any = {
      eventId: Number(eventId)
    };
    
    if (dto.fromDate && dto.toDate) {
      whereShowing.startTime = {
        gte: dto.fromDate,
        lte: dto.toDate
      };
    }

    const showings = await this.prisma.showing.findMany({
      where: whereShowing,
      select: {
        id: true,
        TicketType: true
      }
    });

    if (!showings) {
      return null;
    }

    const ticketTypeData = showings.flatMap(showing => 
      showing.TicketType.map(tt => ({
        ticketTypeId: tt.id,
        typeName: tt.name,
        price: tt.price,
        showingId: tt.showingId,
        quantity: tt.quantity || 0,
      }))
    );
    if (!ticketTypeData) {
      return null;
    }

    const tickets = await this.prisma.ticket.findMany({
      where: {
        status: 1,
        showingId: {
          in: showings.map(s => s.id)
        }
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
      data: {
        eventId: event.id,
        eventTitle: event.title,
        totalRevenue,
        ticketsSold,
        totalTickets,
        percentageSold: totalTickets ? ticketsSold / totalTickets : 0,
        byTicketType: summary.map(({ revenue, ...rest }) => rest)
      },
      statusCode: 200,
      message: "Event summary retrieved successfully"
    });
  }
}