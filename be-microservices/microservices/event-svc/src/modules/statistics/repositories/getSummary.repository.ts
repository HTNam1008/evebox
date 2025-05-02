import { Injectable, NotFoundException } from "@nestjs/common";
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

    async getEventById(eventId: number) {
      return this.prisma.events.findUnique({
        where: { id: eventId },
        select: { id: true, organizerId: true },
      });
    }
  
    async getEventByShowingId(showingId: string) {
      return this.prisma.showing.findUnique({
        where: { id: showingId },
        select: { id: true, eventId: true },
      });
    }
  
    async getMember(eventId: number, userId: string) {
      return this.prisma.eventUserRelationship.findUnique({
        where: {
          eventId_userId: {
            eventId,
            userId,
          },
        },
      });
    }
  
     async hasPermissionToManageMembers(showingId: string, userEmail: string): Promise<boolean> {
        // Step 1: Get the user by email
        const user = await this.prisma.user.findUnique({
          where: { email: userEmail },
        });
  
        const eventId = await this.getEventByShowingId(showingId)
      
      
        if (!user) {
          throw new NotFoundException(`User with email ${userEmail} not found`);
        }
      
        // Step 2: Check if this user is the organizer of the event (they always have permission)
        const event = await this.getEventById(eventId.eventId);
        if (event?.organizerId === user.email) {
          return true;
        }
      
        // Step 3: Get user’s role in the event
        const member = await this.getMember(eventId.eventId, user.id);
        if (!member || member.isDeleted) {
          return false;
        }
      
        // Step 4: Lookup the role’s permissions in event_role table
        const role = await this.prisma.eventRole.findUnique({
          where: { id: member.role },
        });
      
        if (!role) {
          return false;
        }
      
        // Step 5: Return permission flag
        return role.isSummarized;
      }
}