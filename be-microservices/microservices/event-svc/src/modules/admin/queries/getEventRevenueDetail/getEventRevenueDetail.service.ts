import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { ShowingRevenueData } from "./getEventRevenueDetail-response.dto";
import { GetEventRevenueDetailRepository } from "../../repositories/getEventRevenueDetail.repository";
import { Showing } from "@prisma/client";

@Injectable()
export class GetEventRevenueDetailService {
  constructor(private readonly getEventRevenueDetailRepository: GetEventRevenueDetailRepository) {}

  async execute(email: string, orgId: string, eventId: number): Promise<Result<ShowingRevenueData[], Error>> {
    try {
      const result = await this.getEventRevenueDetailRepository.findAll(email, orgId, eventId);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error("Failed to get revenue detail of event"));
    }
  }
}

