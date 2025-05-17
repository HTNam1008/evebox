import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { ShowingRevenueData } from "../queries/getEventRevenueDetail/getEventRevenueDetail-response.dto";

@Injectable()
export class GetEventRevenueDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(email: string, orgId: string, eventId: number): Promise<Result<ShowingRevenueData[], Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user || user.role_id !== 1)  {
        return Err(new Error('You do not have permission to get organizer revenue'));
      }

      const event = await this.prisma.events.findUnique({
        where: {
          id: Number(eventId)
        }
      });

      if (!event) {
        return Err(new Error('No event found'));
      }

      const showings = await this.prisma.showing.findMany({
        where: {
          deleteAt: null,
          eventId: Number(eventId),
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

      if (!showings) {
        return Err(new Error(`No showings of event ${event.title} found`));
      }

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