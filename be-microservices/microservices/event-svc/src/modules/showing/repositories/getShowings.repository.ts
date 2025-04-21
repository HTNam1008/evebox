import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { ShowingDataDto } from "../queries/getShowings/getShowings-response.dto";

@Injectable()
export class GetShowingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findShowingsWithFilters(filters: any): Promise<Result<ShowingDataDto[], Error>> {
    try {
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
        where.startTime = new Date(filters.startTime);
      }

      if (filters.endTime) {
        where.endTime = new Date(filters.endTime);
      }
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