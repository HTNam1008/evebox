import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { ShowingDataDto } from "../queries/getShowings/getShowings-response.dto";

@Injectable()
export class GetShowingsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findShowingsWithFilters(filters: any, email: string): Promise<Result<ShowingDataDto[], Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      })

      if (!user || user.role_id !== 1) {
        return Err(new Error('You do not have permission to get events'));
      }

      const whereCond = this.buildWhereClause(filters);

      const page = filters.page ? Number(filters.page) : 1;
      const limit = filters.limit ? Number(filters.limit) : 10;

      const showings = await this.prisma.showing.findMany({
        where: whereCond,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          startTime: true,
          endTime: true,
          seatMapId: true,
          Events: {
            select: {
              id: true,
              title: true,
            }
          },
          TicketType: {
            select: {
              id: true,
              name: true,
              quantity: true,
            }
          },
        },
        orderBy: {
          startTime: 'asc'
        }
      });

      let updateShowings = [];
      for (const showing of showings) {
        updateShowings = [
          ...updateShowings,
          {
            id: showing.id,
            startTime: showing.startTime,
            endTime: showing.endTime,
            seatMapId: showing.seatMapId,
            eventId: showing.Events.id,
            eventTitle: showing.Events.title,
            event: {
              id: showing.Events.id,
              title: showing.Events.title
            },
            ticketTypes: showing.TicketType
          }
        ];
      }

      return Ok(updateShowings);
    } catch (error) {
      return Err(new Error('Failed to retrieve showings from database'));
    }
  }

  buildWhereClause(filters: any) {
    const where: any = {};

    if (filters.startTime || filters.endTime) {
      where.startTime = {};
      where.endTime = {};

      if (filters.startTime) {
        where.startTime.gte = new Date(filters.startTime);
      }

      if (filters.endTime) {
        where.endTime.lte = new Date(filters.endTime);
      }
    }

    if (filters.search) {
      const search = filters.search;
      const isId = !isNaN(Number(search));

      where.Events = {
        ...(isId
          ? { id: Number(search) }
          : { title: { contains: search, mode: 'insensitive' } })
      };
    }

    return where;
  }

  async count(filters: any): Promise<number> {
    try {
      const whereCond = this.buildWhereClause(filters);
      return this.prisma.showing.count({
        where: whereCond
      })
    } catch (error) {
      throw new Error('Failed to count total showings');
    }
  }
}