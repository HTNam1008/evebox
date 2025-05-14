import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { GetEventSpecialManagementRepository } from "../../repositories/getEventSpecialManagement.repository";
import { EventSpecialData } from "./getEventSpecialManagement-response.dto";

@Injectable()
export class GetEventSpecialManagementService {
  constructor(private readonly getEventSpecialManagementRepository: GetEventSpecialManagementRepository) {}

  async execute(email: string, filters: any): Promise<Result<EventSpecialData[], Error>> {
    try {
      const result = await this.getEventSpecialManagementRepository.getEventSpecialManagement(email, filters);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to get event special management'));
    }
  }

  async count (filters: any): Promise<number> {
    try {
      return await this.getEventSpecialManagementRepository.count(filters);
    } catch (error) {
      throw new Error('Failed to count total events');
    }
  }
}