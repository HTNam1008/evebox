import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { ProvinceRevenueData } from "../queries/getOrgRevenueByProvince/getOrgRevenueByProvince-response.dto";

@Injectable()
export class GetOrgRevenueByProvinceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(email: string): Promise<Result<ProvinceRevenueData[], Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user || user.role_id !== 1)  {
        return Err(new Error('You do not have permission to get organizer revenue'));
      }

      const events = await this.prisma.events.findMany({
        where: {
          isApproved: true,
          deleteAt: null,
        },
        select: {
          id: true,
          locations: {
            select: {
              districts: {
                select: {
                  province: {
                    select: {
                      id: true,
                      name: true
                    },
                  },
                },
              },
            },
          },
          Showing: {
            where: {
              deleteAt: null,
            },
            select: {
              id: true,
              Ticket: {
                where: {
                  paymentId: { not: null },
                },
                select: { price: true },
              }
            }
          }
        }
      });

      const provinceMap = new Map<string, { eventCount: number, showingCount: number, totalRevenue: number }>();

      for (const event of events) {
        const provinceName = event.locations?.districts?.province?.name || "Khác";

        const prev = provinceMap.get(provinceName) || { eventCount: 0, showingCount: 0, totalRevenue: 0 };
        const eventRevenue = event.Showing.flatMap(s => s.Ticket).reduce((sum, ticket) => sum + ticket.price, 0);
        const showingCount = event.Showing.length;

        provinceMap.set(provinceName, {
          eventCount: prev.eventCount + 1,
          showingCount: prev.showingCount + showingCount,
          totalRevenue: prev.totalRevenue + eventRevenue,
        });
      }

      const result: ProvinceRevenueData[] = Array.from(provinceMap.entries()).map(([provinceName, data]) => ({
        provinceName,
        eventCount: data.eventCount,
        showingCount: data.showingCount,
        totalRevenue: data.totalRevenue,
      }));

      return Ok(result);
    } catch (error) {
      return Err(new Error('Failed to get organizer revenue by province'));
    }
  }
}