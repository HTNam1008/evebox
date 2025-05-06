import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { EventRevenueData } from "./getOrgRevenueById-response.dto";
import { GetOrgRevenueByIdRepository } from "../../repositories/getOrgRevenueById.repository";

@Injectable()
export class GetOrgRevenueByIdService {
  constructor(private readonly getOrgRevenueByIdRepository: GetOrgRevenueByIdRepository) {}

  async execute(orgId: string, email: string): Promise<Result<EventRevenueData[], Error>> {
    try {
      const result = await this.getOrgRevenueByIdRepository.findByOrgId(orgId, email);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error(`Failed to get revenue of organizer ${orgId}`));
    }
  }
}