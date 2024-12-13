import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class EventFrontDisplayRepository {
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
}
