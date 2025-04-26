import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class StatisticsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findEventById(eventId: number) {
    return this.prisma.events.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        organizerId: true,
        totalClicks: true,
        weekClicks: true,
      },
    });
  }

  async countUniqueUsersByEvent(eventId: number) {
    const clicks = await this.prisma.userClickHistory.findMany({
        where: { eventId },
        select: { userId: true },
      });
      
      const uniqueUserIds = new Set(clicks.map(click => click.userId));
      return uniqueUserIds.size;
  }

  async countOrdersByEvent(eventId: number) {
    const showingIds = await this.prisma.showing.findMany({
        where: { eventId },
        select: { id: true },
      });
      
      // Get IDs
      const showingIdList = showingIds.map(s => s.id);
      
      let totalOrders = 0;
      if (showingIdList.length > 0) {
        totalOrders = await this.prisma.orderInfo.count({
          where: {
            showingId: { in: showingIdList },
          },
        });
      }

      return totalOrders;
  }

  async countBuyersByEvent(eventId: number) {
    // Step 1: Get all showing IDs for this event
    const showingIds = await this.prisma.showing.findMany({
      where: { eventId },
      select: { id: true },
    });
  
    const showingIdList = showingIds.map((s) => s.id);
  
    // Initialize totals
    let totalOrders = 0;
    let totalBuyers = 0;
  
    // Step 2: If there are showings, fetch data
    if (showingIdList.length > 0) {
      const orders = await this.prisma.orderInfo.findMany({
        where: {
          showingId: { in: showingIdList },
        },
        select: {
          userId: true, // Only fetch userId
        },
      });
  
      totalOrders = orders.length;
  
      const uniqueUserIds = new Set(orders.map((order) => order.userId));
      totalBuyers = uniqueUserIds.size;
    }
  
    return totalBuyers;
  }

  async getEventById(eventId: number) {
    return this.prisma.events.findUnique({
      where: { id: eventId },
      select: { id: true, organizerId: true },
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

   async hasPermissionToManageMembers(eventId: number, userEmail: string): Promise<boolean> {
        // Step 1: Get the user by email
        const user = await this.prisma.user.findUnique({
          where: { email: userEmail },
        });
        
      
        if (!user) {
          throw new NotFoundException(`User with email ${userEmail} not found`);
        }
      
        // Step 2: Check if this user is the organizer of the event (they always have permission)
        const event = await this.getEventById(eventId);
        if (event?.organizerId === user.email) {
          return true;
        }
      
        // Step 3: Get user’s role in the event
        const member = await this.getMember(eventId, user.id);
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
        return role.viewOrder;
     }
}
