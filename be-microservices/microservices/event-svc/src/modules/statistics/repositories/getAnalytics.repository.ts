import { Injectable } from '@nestjs/common';
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
  
}
