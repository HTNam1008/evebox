import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { RevenueSummaryItem } from "./getOrgRevenueChart-response.dto";
import { GetOrgRevenueChartRepository } from "../../repositories/getOrgRevenueChart.repository";

@Injectable()
export class GetOrgRevenueChartService {
  constructor(private readonly getOrgRevenueChartRepository: GetOrgRevenueChartRepository) { }

  async execute(email: string, fromDate?: string, toDate?: string, filterType: "month" | "year" = "month"): Promise<Result<RevenueSummaryItem[], Error>> {
    try {
      const from = fromDate ? new Date(fromDate) : undefined;
      const to = toDate ? new Date(toDate) : undefined;

      if (from && to && from > to) {
        return Err(new Error('fromDate must be earlier than or equal to toDate'));
      }

      const result = await this.getOrgRevenueChartRepository.findRevenueSummary(email, from, to, filterType);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error(`Failed to get org revenue chart: ${error}`));
    }
  }
}