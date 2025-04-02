import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { GetEventFrontDisplayRepository } from "./getEventFrontDisplay.repository";

@Injectable()
export class GetEventDetailRecommendRepository {
  constructor(private readonly prisma: PrismaService,
    private readonly getEventFrontDisplayRepository: GetEventFrontDisplayRepository,
  ) {}

  async getRecommendedEventsInDetail(eventId: number, limit: string) {
    const event = await this.prisma.events.findUnique({
      where: { id: eventId,
        deleteAt: null,
       },
      select: {
        locations: {
          select: {
            districts: {
              select: {
                provinceId: true,
              },
            },
          },
        },
      },
    });
  
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found.`);
    }
  
    const provinceId = event.locations.districts.provinceId;
    const now = new Date();
    const events = await this.prisma.events.findMany({
      where: {
        locations: {
          districts: {
            provinceId: provinceId,
          },
        },
        Showing: {
          some: {
            startTime: limit === 'all' ? undefined : { gte: now },
          },
        },
        id: { not: eventId }, 
        deleteAt: null,
      },
      orderBy: [
        { lastScore: 'desc' }, 
      ],
      take: limit === 'all' ? undefined : parseInt(limit, 10),
      select: {
        id: true,
        title: true,
        lastScore: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        weekClicks: true,
        totalClicks: true,
      },
    });
    let updateEvents = [];
    for(const event of events) {
      const showings = await this.prisma.showing.findMany({
        where: {
          eventId: event.id,
          startTime: {
            gte: now,
          },
          deleteAt: null,
        },
        select: {
          id: true,
          startTime: true,
          TicketType: {
            select: {
              price: true,
              id: true,
            }
          }
        },
      });
      const eventAddition = await this.getEventFrontDisplayRepository.caculateEvents(showings);
      updateEvents = [...updateEvents, {...event, ...eventAddition}];
    }
    return updateEvents;
  }
}