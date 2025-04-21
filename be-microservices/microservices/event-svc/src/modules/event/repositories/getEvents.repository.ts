import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { EventDataDto } from "../queries/getEvents/getEvents-response.dto";

@Injectable()
export class GetEventsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findWithFilters(filters: any): Promise<Result<EventDataDto[], Error>> {
    try {
      const whereCond = this.buildWhereClause(filters);

      const page = filters.page ? Number(filters.page) : 1;
      const limit = filters.limit ? Number(filters.limit) : 10;

      const events = await this.prisma.events.findMany({
        where: {
          ...whereCond,
          ...(filters.categoryId && {
            EventCategories: {
              some: {
                categoryId: filters.categoryId >> 0
              }
            }
          })
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          venue: true,
          Images_Events_imgLogoIdToImages: true,
          Images_Events_imgPosterIdToImages: true,
          deleteAt: true,
          locations: {
            select: {
              street: true,
              ward: true,
              districts: {
                select: {
                  name: true,
                  province: {
                    select: {
                      name: true,
                    }
                  }
                }
              }
            }
          },
          isApproved: true,
          createdAt: true,
          isSpecial: true,
          isOnlyOnEve: true,
          isOnline: true,
        },
        orderBy: {
          createdAt: 'desc',
        }
      });

      let updateEvents = [];
      for (const event of events) {
        const categoriesData = await this.prisma.eventCategories.findMany({
          where: {
            eventId: event.id,
          },
          select: {
            Categories: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });

        const categories = categoriesData.map((category) => {
          return {
            id: category.Categories.id,
            name: category.Categories.name
          }
        })

        const showings = await this.prisma.showing.findMany({
          where: {
            eventId: event.id,
          },
          select: {
            id: true,
            startTime: true,
          }
        })

        const { street, ward, districts } = event.locations ?? {};
        const districtName = districts?.name || '';
        const provinceName = districts?.province?.name || '';
        const locationsString = `${street || ''}, ${ward || ''}, ${districtName}, ${provinceName}`;
        const startTime = await this.caculateEventsStartDate(showings);

        updateEvents = [...updateEvents, { ...event, startTime, categories, locationsString }];
      }

      return Ok(updateEvents);
    } catch (error) {
      return Err(new Error('Failed to retrieve events from database'));
    }
  }

  buildWhereClause(filters: any) {
    const where: any = {};
    if (filters.isApproved !== undefined) {
      where.isApproved = filters.isApproved === 'true';
    }

    if (filters.isDeleted === 'true') {
      where.deleteAt = { not: null };
    } else if (filters.isDeleted === 'false') {
      where.deleteAt = null;
    }

    if (filters.createdFrom || filters.createdTo) {
      where.createdAt = {};

      if (filters.createdFrom) {
        where.createdAt.gte = new Date(filters.createdFrom);
      }

      if (filters.createdTo) {
        where.createdAt.lte = new Date(filters.createdTo);
      }
    }

    return where;
  }

  async count (filters: any): Promise<number> {
    try {
      const whereCond = this.buildWhereClause(filters);
      return this.prisma.events.count({
        where: whereCond
      })
    } catch (error) {
      throw new Error('Failed to count total events');
    }
  }

  async caculateEventsStartDate(showings: any[]) {
    let startTime = new Date("9999-12-31T23:59:59.999Z");
    const nowDate = new Date();
    for (const showing of showings) {
      if (new Date(showing.startTime) > nowDate && new Date(showing.startTime) < startTime) {
        startTime = new Date(showing.startTime);
        continue;
      }
      if (new Date(showing.startTime) < startTime) {
        startTime = new Date(showing.startTime);
      }
    }
    return startTime;
  }
}