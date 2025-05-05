import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { EventRevenueData, ShowingRevenueData, TicketTypeRevenueData } from "../queries/getOrgRevenueById/getOrgRevenueById-response.dto";

const FEE_PERCENT = 10;

@Injectable()
export class GetOrgRevenueByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByOrgId(orgId: string, email: string): Promise<Result<EventRevenueData[], Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user || user.role_id !== 1)  {
        return Err(new Error('You do not have permission to get organizer revenue'));
      }

      const events = await this.prisma.events.findMany({
        where: {
          organizerId: orgId,
          isApproved: true,
          deleteAt: null,
        },
        include: {
          Showing: {
            include: {
              Ticket: {
                where: {
                  paymentId: { not: null },
                },
                select: {
                  id: true,
                  price: true,
                  TicketQRCode: {
                    select: {
                      ticketTypeId: true,
                    }
                  }
                }
              },
              TicketType: true
            }
          }
        }
      });

      const results: EventRevenueData[] = [];

      for (const event of events) {
        let eventRevenue = 0;
        const showings: ShowingRevenueData[] = [];

        for (const showing of event.Showing) {
          let showingRevenue = 0;

          const ticketTypeMap: Record<string, TicketTypeRevenueData> = {};

          for (const ticketType of showing.TicketType) {
            ticketTypeMap[ticketType.id] = {
              ticketTypeId: ticketType.id,
              name: ticketType.name,
              price: ticketType.price,
              quantitySold: 0,
              revenue: 0
            };
          }

          for (const ticket of showing.Ticket) {
            const ticketTypeId = ticket.TicketQRCode[0]?.ticketTypeId;
            if (ticketTypeId && ticketTypeMap[ticketTypeId]) {
              ticketTypeMap[ticketTypeId].quantitySold += 1;
              ticketTypeMap[ticketTypeId].revenue += ticket.price;
              showingRevenue += ticket.price;
            }
          }

          showings.push({
            showingId: showing.id,
            startDate: showing.startTime,
            endDate: showing.endTime,
            revenue: showingRevenue,
            ticketTypes: Object.values(ticketTypeMap)
          });

          eventRevenue += showingRevenue;
        }

        results.push({
          eventId: event.id,
          eventName: event.title,
          totalRevenue: eventRevenue,
          platformFeePercent: FEE_PERCENT,
          actualRevenue: eventRevenue * (1 - FEE_PERCENT / 100),
          showings
        });
      }

      return Ok(results);
    } catch (err) {
      return Err(new Error("Failed to fetch revenue by orgId"));
    }
  }
}