import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";

@Injectable()
export class EventDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEventDetail(eventId: number) {
    return this.prisma.events.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        organizerId: true,
        status: true,
        locationId: true,
        totalTickets: true,
        availableTickets: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        createdAt: true,
        locations: {
          select: {
            id: true,
            street: true,
            ward: true,
            districtId: true,
            createdAt: true,
          },
        },
        lastScore: true,
        isSpecial: true,
        isOnlyOnEve: true,
        EventCategories: {
          select: {
            Categories: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async getRecommendedEventsInDetail(eventId, locations, numberOfEvents = 20) {
    return this.prisma.events.findMany({
      where: {
        id: {
          not: eventId,
        },
        locationId: {
          in: locations,
        },
      },
      orderBy: [
        {
          startDate: 'asc',
        },
        {
          lastScore: 'desc',
        },
      ],
      select: {
        id: true,
        title: true,
        startDate: true,
        lastScore: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
      },
      take: numberOfEvents,
    });
  }
}