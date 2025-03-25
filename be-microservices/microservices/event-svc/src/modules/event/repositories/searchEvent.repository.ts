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

  async getEventsByTitleAndCategory(title: string, categories: string[]) {
    const events = await this.prisma.events.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
        EventCategories: categories.length > 0 
          ? {
              some: {
                Categories: {
                  name: {
                    in: categories,
                    mode: 'insensitive',
                  },
                },
              },
            }
          : undefined,
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
      },
    });
  
    const now = new Date();
    let updatedEvents = [];
  
    for (const event of events) {
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
            },
          },
        },
      });
  
      const eventAddition = await this.getEventFrontDisplayRepository.caculateEvents(showings);
      updatedEvents.push({
        ...event,
        ...eventAddition,
      });
    }
  
    return updatedEvents;
  }

  async getEventsByTitleCategoryAndDate(
    title: string,
    categories: string[],
    startDate?: string,
    endDate?: string
  ) {
    const events = await this.prisma.events.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
        EventCategories: categories.length > 0
          ? {
              some: {
                Categories: {
                  name: {
                    in: categories,
                    mode: 'insensitive',
                  },
                },
              },
            }
          : undefined,
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
      },
    });
  
    const now = new Date();
    let updatedEvents = [];
  
    // Convert startDate / endDate strings to Date objects if provided
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
  
    for (const event of events) {
      const showings = await this.prisma.showing.findMany({
        where: {
          eventId: event.id,
          startTime: {
            gte: start ?? now, // If start provided, use that, else use current time
            lte: end ?? undefined, // End time filter if provided
          },
        },
        select: {
          id: true,
          startTime: true,
          TicketType: {
            select: {
              price: true,
              id: true,
            },
          },
        },
      });
  
      // Only include events that have showings in this time range
      if (showings.length > 0) {
        const eventAddition = await this.getEventFrontDisplayRepository.caculateEvents(showings);
        updatedEvents.push({
          ...event,
          ...eventAddition,
        });
      }
    }
  
    return updatedEvents;
  }

  async getEventsByTitleCategoryDateAndPrice(
    title: string,
    categories: string[],
    startDate?: string,
    endDate?: string,
    minPrice?: number,
    maxPrice?: number
  ) {
    const events = await this.prisma.events.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
        EventCategories: categories.length > 0
          ? {
              some: {
                Categories: {
                  name: {
                    in: categories,
                    mode: 'insensitive',
                  },
                },
              },
            }
          : undefined,
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
      },
    });
  
    const now = new Date();
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
  
    let updatedEvents = [];
  
    for (const event of events) {
      const showings = await this.prisma.showing.findMany({
        where: {
          eventId: event.id,
          startTime: {
            gte: start ?? now,
            lte: end ?? undefined,
          },
        },
        select: {
          id: true,
          startTime: true,
          TicketType: {
            select: {
              price: true,
              id: true,
            },
          },
        },
      });
  
      if (showings.length > 0) {
        const eventAddition = await this.getEventFrontDisplayRepository.caculateEvents(showings);
  
        // Filter by price range on the calculated minTicketPrice
        if (
          (minPrice !== undefined && eventAddition.minTicketPrice < minPrice) ||
          (maxPrice !== undefined && eventAddition.minTicketPrice > maxPrice)
        ) {
          continue;
        }
  
        updatedEvents.push({
          ...event,
          ...eventAddition,
        });
      }
    }
  
    return updatedEvents;
  }
  
}
