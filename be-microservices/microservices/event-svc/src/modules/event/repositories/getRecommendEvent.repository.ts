import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { GetEventDetailRepository } from './getEventDetail.repository';
import { GetEventFrontDisplayRepository } from './getEventFrontDisplay.repository';

@Injectable()
export class GetRecommendEventRepository {
  constructor(private readonly prisma: PrismaService,
    private readonly getEventFrontDisplayRepository: GetEventFrontDisplayRepository,
  ) {}
  async getRecommendedEvents(gte: Date, lte: Date) {
    const events = await this.prisma.events.findMany({
      where:{
        Showing: {
          some: {
            startTime: {
              gte: gte,
              lte: lte
            }
          }
        },
        deleteAt: null,
      },
      orderBy: {
        lastScore: 'desc',
      },
      select: {
        id: true,
        title: true,
        lastScore: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        weekClicks: true,
        totalClicks: true,
      },
      take: 20,
    });
    let updateEvents = [];
    const now = new Date();
    for(const event of events) {
      const showings = await this.prisma.showing.findMany({
        where: {
          eventId: event.id,
          startTime: {
            gte: now,
          },
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
