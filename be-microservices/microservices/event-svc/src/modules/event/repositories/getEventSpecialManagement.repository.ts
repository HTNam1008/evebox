import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { EventSpecialData } from "../queries/getEventSpecialManagement/getEventSpecialManagement-response.dto";

@Injectable()
export class GetEventSpecialManagementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEventSpecialManagement(email: string, filters: any): Promise<Result<EventSpecialData[], Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      })

      if (!user || user.role_id !== 1) {
        return Err(new Error('You do not have permission to get special events'));
      }

      const whereCond = this.buildWhereClause(filters);

      const page = filters.page ? Number(filters.page) : 1;
      const limit = filters.limit ? Number(filters.limit) : 10;

      const events = await this.prisma.events.findMany({
        where: {
          ...whereCond,
          ...(filters.categoryId && {
            EventCategories: {
              some: {
                categoryId: filters.categoryId >> 0,
                isSpecial: true
              }
            }
          })
        },
        skip: (page - 1) * limit, // Skip to the correct page
        take: limit,
        select: {
          id: true,
          title: true,
          Images_Events_imgPosterIdToImages: {
            select: {
              id: true,
              imageUrl: true,
            }
          },
          isSpecial: true,
          isOnlyOnEve: true,
          EventCategories: {
            select: {
              isSpecial: true,
              Categories: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        }
      });

      const formattedEvents: EventSpecialData[] = events.map((event) => ({
        id: event.id,
        title: event.title,
        isSpecial: event.isSpecial,
        isOnlyOnEve: event.isOnlyOnEve,
        Images_Events_imgPosterIdToImages: {
          id: event.Images_Events_imgPosterIdToImages?.id || 0,
          imageUrl: event.Images_Events_imgPosterIdToImages?.imageUrl || '',
        },
        categoryIds: event.EventCategories.map((ec) => ({
          id: ec.Categories.id,
          name: ec.Categories.name,
          isSpecial: ec.isSpecial,
        })),
      }));

      return Ok(formattedEvents);
    } catch (error) {
      return Err(new Error('Failed to get event special management'));
    }
  }

  async count(filters: any): Promise<number> {
    try {
      const whereCond = this.buildWhereClause(filters);
      return this.prisma.events.count({
        where: whereCond
      })
    } catch (error) {
      throw new Error('Failed to count total events');
    }
  }

  buildWhereClause(filters: any) {
    const where: any = {};

    // Filter by isSpecial
    if (filters.isSpecial !== undefined) {
      where.isSpecial = filters.isSpecial === 'true';
    }

    // Filter by isOnlyOnEve
    if (filters.isOnlyOnEve !== undefined) {
      where.isOnlyOnEve = filters.isOnlyOnEve === 'true';
    }

    // Filter by search keyword (title, id)
    if (filters.search) {
      const keyword = filters.search.trim();
      if (!isNaN(Number(keyword))) {
        where.OR = [
          { id: Number(keyword) },
          { title: { contains: keyword, mode: 'insensitive' } },
        ];
      } else {
        where.title = { contains: keyword, mode: 'insensitive' };
      }
    }

    return where;
  }
}