import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { GetEventFrontDisplayRepository } from './getEventFrontDisplay.repository';

@Injectable()
export class SearchEventRepository {
  constructor(private readonly prisma: PrismaService,
    private readonly getEventFrontDisplayRepository: GetEventFrontDisplayRepository,
  ) {}

  async getEventsByTitle(title: string) {
    const events = await this.prisma.events.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        lastScore: true,
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
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
      }
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
