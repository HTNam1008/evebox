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

  async getSeatmap(showingId: string) {
    const seatmapId = await this.prisma.showing.findUnique({
      where: {
        id: showingId,
      },
      select:{
        seatMapId: true,
      }
    });

    if(!seatmapId){
      return null;
    }

    const seatmap = await this.prisma.seatmap.findUnique({
      where: {
        id: seatmapId.seatMapId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        viewBox: true,
        status: true,
        Section: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            seatmapId: true,
            isStage: true,
            element: true,
            attribute: true,
            ticketTypeId: true,
            Row: {
              select: {
                id: true,
                name: true,
                sectionId: true,
                createdAt: true,
                Seat: {
                  select: {
                    id: true,
                    name: true,
                    rowId: true,
                    position: true,
                    positionX: true,
                    positionY: true,
                    createdAt: true,
                    Ticket: {
                      where:{
                        showingId: showingId,
                      }
                      ,select: {
                        status: true,
                      }
                    }
                  },
                },
              },
            },
          },
        },
      },
    });
    return seatmap;
  }
}