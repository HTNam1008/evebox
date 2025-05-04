import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { ShowingRevenueData } from "../queries/getEventRevenueDetail/getEventRevenueDetail-response.dto";

@Injectable()
export class GetEventRevenueDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(email: string, orgId: string, eventId: number): Promise<Result<ShowingRevenueData[], Error>> {
    try {
      const user = this.prisma.user.findUnique({
        where: { email }
      });

      if (!user || (await user).role_id !== 1)  {
        return Err(new Error('You do not have permission to get organizer revenue'));
      }

      const showings = await this.prisma.showing.findMany({
        where: {
          deleteAt: null,
          eventId,
          Events: {
            organizerId: orgId,
            isApproved: true,
            deleteAt: null
          }
        },
        include: {
          Ticket: {
            where: {
              paymentId: {
                not: null
              }
            },
            select: {
              price: true
            }
          }
        }
      });

      const result: ShowingRevenueData[] = showings.map(showing => {
        const totalRevenue = showing.Ticket.reduce((sum, t) => sum + t.price, 0);

        return {
          showingId: showing.id,
          startTime: showing.startTime,
          endTime: showing.endTime,
          revenue: totalRevenue
        };
      });

      return Ok(result);
    } catch (error) {
      return Err(new Error("Failed to get revenue detail of event"));
    }
  }
}