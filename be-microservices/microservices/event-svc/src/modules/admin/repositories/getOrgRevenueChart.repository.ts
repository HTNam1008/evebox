import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { RevenueSummaryItem } from "../queries/getOrgRevenueChart/getOrgRevenueChart-response.dto";

@Injectable()
export class GetOrgRevenueChartRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findRevenueSummary(email: string, fromDate?: Date, toDate?: Date, filterType: "month" | "year" = "month"): Promise<Result<RevenueSummaryItem[], Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user || user.role_id !== 1)  {
        return Err(new Error('You do not have permission to get organizer revenue'));
      }

      if (filterType && filterType !== 'month' && filterType !== 'year') {
        return Err(new Error("Invalid filterType. Must be 'month' or 'year'"))
      }

      const FEE_PERCENT = 10;

      const showingWhere: any = {
        deleteAt: null,
        isApproved: true,
      };

      if (fromDate) {
        showingWhere.startTime = { gte: fromDate };
      }
      if (toDate) {
        showingWhere.startTime = {
          ...(showingWhere.startTime || {}),
          lte: toDate,
        };
      }

      const groupByFormat = filterType === "year" ? 'YYYY' : 'YYYY-MM';

      const rawQuery = `
      SELECT
        to_char(s."startTime", '${groupByFormat}') AS period,
        SUM(t.price) AS "totalRevenue"
      FROM "Showing" s
      JOIN "Ticket" t ON t."showingId" = s.id
      WHERE t."paymentId" IS NOT NULL
        AND s."deleteAt" IS NULL
        ${fromDate ? `AND s."startTime" >= '${fromDate.toISOString()}'` : ""}
        ${toDate ? `AND s."startTime" <= '${toDate.toISOString()}'` : ""}
      GROUP BY period
      ORDER BY period
    `;

      const result = await this.prisma.$queryRawUnsafe<RevenueSummaryItem[]>(rawQuery);

      const mappedResult = result.map((row: any) => ({
        period: row.period,
        totalRevenue: Number(row.totalRevenue),
        actualRevenue: Number(row.totalRevenue) * (1 - FEE_PERCENT / 100),
      }));

      return Ok(mappedResult);
    } catch (error) {
      return Err(new Error('Failed to get org revenue chart'));
    }
  }
}