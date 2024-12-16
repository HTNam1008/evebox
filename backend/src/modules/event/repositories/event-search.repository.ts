import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class EventSearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEventsByTitle(title: string) {
    return this.prisma.events.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
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
  }
}
