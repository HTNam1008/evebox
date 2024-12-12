import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSpecialEvents() {
    return this.prisma.events.findMany({
      where: {
        isSpecial: true,
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
      },
    });
  }

  async getOnlyOnEveEvents() {
    return this.prisma.events.findMany({
      where: {
        isOnlyOnEve: true,
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
      },
    });
  }

  async getSpecialEventsByCategory() {
    // Lấy tất cả categories
    const categories = await this.prisma.categories.findMany();

    // Tạo response chứa danh sách các sự kiện "special" theo từng category
    const categorySpecials = [];

    for (const category of categories) {
      // Lấy tất cả sự kiện có isSpecial = true cho từng category
      const specialEvents = await this.prisma.eventCategories.findMany({
        where: {
          categoryId: category.id,
          Events: {
            isSpecial: true,
          },
        },
        select: {
          Categories: {
            select: {
              id: true,
              name: true,
            },
          },
          Events: {
            select: {
              id: true,
              title: true,
              startDate: true,
              endDate: true,
              createdAt: true,
              Images_Events_imgLogoIdToImages: true,
              Images_Events_imgPosterIdToImages: true,
            },
          },
        },
      });

      // Nếu có sự kiện special cho category này thì thêm vào kết quả
      if (specialEvents.length > 0) {
        categorySpecials.push({
          category: category,
          events: specialEvents.map((eventCategory) => eventCategory.Events),
        });
      }
    }

    return categorySpecials;
  }

  async getTrendingEvents() {
    return this.prisma.events.findMany({
      orderBy: {
        lastScore: 'desc',
      },
      take: 20,
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
      },
    });
  }

  async getEventsByTitle(title: string) {
    return this.prisma.events.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        EventCategories: {
          include: {
            Categories: true,
          },
        },
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
      },
    });
  }

  async getRecommendedEvents(eventId: number) {
    const currentEventCategories = await this.prisma.eventCategories.findMany({
      where: {
        eventId: eventId,
      },
      select: {
        categoryId: true,
      }
    });

    if (!currentEventCategories.length) {
      return [];
    }

    const categoryIds = currentEventCategories.map((eventCategory) => eventCategory.categoryId);

    return this.prisma.events.findMany({
      where: {
        id: {
          not: eventId, // except current event
        },
        EventCategories: {
          some: {
            categoryId: {
              in: categoryIds, // only events that have at least one category in common with current event
            },
          },
        },
      },
      orderBy: {
        startDate: 'asc', // prioritize events that start soon
      },      
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        status: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
      }
    })
  }
}
