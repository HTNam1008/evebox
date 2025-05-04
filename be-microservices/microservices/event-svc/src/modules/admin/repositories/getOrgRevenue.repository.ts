import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { OrganizerRevenueData, EventRevenueData, ShowingRevenueData, TicketTypeRevenueData } from "../queries/getOrgRevenue/getOrgRevenue-response.dto";

const FEE_PERCENT = 10; // default, or can be got from OrgPaymentInfo table

@Injectable()
export class GetOrgRevenueRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(email: string, fromDate?: Date, toDate?: Date, search?: string): Promise<Result<OrganizerRevenueData[], Error>> {
    try {
      const user = this.prisma.user.findUnique({
        where: { email }
      });

      if (!user || (await user).role_id !== 1)  {
        return Err(new Error('You do not have permission to get organizer revenue'));
      }

      const whereCond: any = {
        isApproved: true,
        deleteAt: null,
      };

      if (search) {
        whereCond.orgName = {
          contains: search,
          mode: 'insensitive',
        };
      }

      const events = await this.prisma.events.findMany({
        where: whereCond,
        include: {
          Showing: {
            where: {
              ...(fromDate && { startTime: { gte: fromDate } }),
              ...(toDate && { startTime: { lte: toDate } }),
              deleteAt: null
            },
            include: {
              Ticket: {
                where: {
                  paymentId: { not: null },
                },
                select: {
                  price: true,
                  TicketQRCode: {
                    select: {
                      ticketTypeId: true,
                    }
                  }
                }
              },
              TicketType: true,
            }
          }
        }
      });

      const orgMap = new Map<string, OrganizerRevenueData>();

      for (const event of events) {
        const orgId = event.organizerId || 'unknown';
        const orgName = event.orgName || orgId;

        if (!orgMap.has(orgId)) {
          orgMap.set(orgId, {
            orgId,
            organizerName: orgName,
            totalRevenue: 0,
            platformFeePercent: FEE_PERCENT,
            actualRevenue: 0,
            events: [],
          });
        }
        
        const showings: ShowingRevenueData[] = [];

        let eventRevenue = 0;

        for (const showing of event.Showing) {
          let showingRevenue = 0;
          const ticketTypeMap = new Map<
            string,
            { name: string; price: number; sold: number }
          >();

          for (const type of showing.TicketType) {
            ticketTypeMap.set(type.id, {
              name: type.name,
              price: type.price,
              sold: 0,
            });
          }

          for (const ticket of showing.Ticket) {
            const ticketTypeId = ticket.TicketQRCode[0]?.ticketTypeId;
            if (!ticketTypeId) continue;

            const type = ticketTypeMap.get(ticketTypeId);
            if (type) {
              type.sold += 1;
              showingRevenue += ticket.price;
            }
          }

          const ticketTypeDetails: TicketTypeRevenueData[] = [];

          for (const [typeId, info] of ticketTypeMap.entries()) {
            ticketTypeDetails.push({
              ticketTypeId: typeId,
              name: info.name,
              price: info.price,
              sold: info.sold,
              revenue: info.sold * info.price,
            });
          }

          showings.push({
            showingId: showing.id,
            startDate: showing.startTime,
            endDate: showing.endTime,
            revenue: showingRevenue,
            ticketTypes: ticketTypeDetails,
          });

          eventRevenue += showingRevenue;
        }

        const actualEventRevenue = eventRevenue * (1 - FEE_PERCENT / 100);

        const orgData = orgMap.get(orgId)!;
        orgData.totalRevenue += eventRevenue;
        orgData.actualRevenue += actualEventRevenue;
        orgData.events.push({
          eventId: event.id,
          eventName: event.title,
          totalRevenue: eventRevenue,
          platformFeePercent: FEE_PERCENT,
          actualRevenue: actualEventRevenue,
          showings,
        });
      }

      const result: OrganizerRevenueData[] = Array.from(orgMap.values());

      return Ok(result);
    } catch (error) {
      return Err(new Error('Failed to get organizer revenue'));
    }
  }
}