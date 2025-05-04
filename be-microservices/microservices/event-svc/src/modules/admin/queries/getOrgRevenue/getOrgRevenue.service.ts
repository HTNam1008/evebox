import { Injectable } from "@nestjs/common";
import { Result, Err, Ok } from "oxide.ts";
import { OrganizerRevenueData } from "./getOrgRevenue-response.dto";
import { GetOrgRevenueRepository } from "../../repositories/getOrgRevenue.repository";

@Injectable()
export class GetOrgRevenueService {
  constructor(private readonly getOrgRevenueRepository: GetOrgRevenueRepository) {}

  async execute(email: string, fromDate?: string, toDate?: string, search?: string): Promise<Result<OrganizerRevenueData[], Error>> {
    try {
      const from = fromDate ? new Date(fromDate) : undefined;
      const to = toDate ? new Date(toDate) : undefined;

      if (from && to && from > to) {
        return Err(new Error("fromDate must be earlier than or equal to toDate"));
      }

      const result = await this.getOrgRevenueRepository.findAll(email, from, to, search);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to get organizer revenue'));
    }
  }
}