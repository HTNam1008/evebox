import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { SummaryTicketRevenueData } from "./getSummaryTicketRevenue-response.dto";
import { GetSummaryTicketRevenueRepository } from "../../repositories/getSummaryTicketRevenue.repository";

@Injectable()
export class GetSummaryTicketRevenueService {
  constructor(private readonly getSummaryTicketRevenueRepository: GetSummaryTicketRevenueRepository) {}

  async execute(email: string, showingId: string, eventId: number, orgId: string): Promise<Result<SummaryTicketRevenueData, Error>> {
    try {
      if (!showingId) {
        return Err(new Error('Showing ID is required'));
      }

      if (!eventId) {
        return Err(new Error('Event ID is required'));
      }

      if (!orgId) {
        return Err(new Error('Organizer ID is required'));
      }

      const result = await this.getSummaryTicketRevenueRepository.getSummary(email, showingId, eventId, orgId);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to get summary of ticket revenue'));
    }
  }
}