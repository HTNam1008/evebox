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
        status: true,
        lastScore: true,
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
        status: true,
        lastScore: true,
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
              status: true,
              lastScore: true,
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
    const now = new Date();
  
    // Tính số ngày từ Thứ Hai đến hiện tại
    const daysSinceMonday = now.getDay() === 0 ? 6 : now.getDay() - 1; // 0 là Chủ Nhật, nên đổi thành 6
  
    // Lấy dữ liệu từ Prisma
    const events = await this.prisma.events.findMany({
      select: {
        id: true,
        title: true,
        startDate: true,
        status: true,
        lastScore: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        weekClicks: true,
      },
    });
  
    // Tính toán và sắp xếp
    const trendingEvents = events
      .map(event => {
        const calculatedScore = event.weekClicks / (daysSinceMonday + 1); // Tránh chia cho 0
        const maxScore = Math.max(Number(event.lastScore), calculatedScore); // Lấy điểm lớn hơn giữa lastScore và calculatedScore
        return {
          ...event,
          calculatedScore,
          maxScore,
        };
      })
      .sort((a, b) => b.maxScore - a.maxScore) // Sắp xếp theo maxScore giảm dần
      .slice(0, 20); // Lấy 20 sự kiện có điểm cao nhất
  
    return trendingEvents;
  }
  

  async getRecommendedEvents(gte: Date, lte: Date) {
    return this.prisma.events.findMany({
      where:{
        startDate:{
          gte:gte,
          lte:lte
        }
      },
      orderBy: {
        lastScore: 'desc',
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        status: true,
        lastScore: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
      },
    });
  }
}
