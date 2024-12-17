import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class ShowingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getShowingDetail(showingId: string) {
    const showing = await this.prisma.showing.findUnique({
      where: {
        id: showingId,
      },
      select: {
        id: true,
        eventId: true,
        status: true,
        isFree: true,
        isSalable: true,
        isPresale: true,
        seatMapId: true,
        startTime: true,
        endTime: true,
        isEnabledQueueWaiting: true,
        showAllSeats: true,
        Events: {
          select: {
            id: true,
            title: true,
            startDate: true,
            status: true,
            lastScore: true,
            Images_Events_imgLogoIdToImages: true,
            Images_Events_imgPosterIdToImages: true,
            totalClicks: true,
            weekClicks: true,
          },
        },
        TicketType: {
          select: {
            id: true,
              name: true,
              description: true,
              color: true,
              isFree: true,
              price: true,
              originalPrice: true,
              maxQtyPerOrder: true,
              minQtyPerOrder: true,
              effectiveFrom: true,
              effectiveTo: true,
              position: true,
              status: true,
              imageUrl: true,
              isHidden: true,
          },
        },
      },
    });

    return showing;
  }
}