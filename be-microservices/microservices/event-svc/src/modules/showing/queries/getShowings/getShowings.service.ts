import { Injectable } from "@nestjs/common";
import { Err, Result } from "oxide.ts";
import { GetShowingsRepository } from "../../repositories/getShowings.repository";
import { ShowingDataDto } from "./getShowings-response.dto";

@Injectable()
export class GetShowingsService {
  constructor(private readonly getShowingsRepository: GetShowingsRepository) {}

  async execute(filters: any): Promise<Result<ShowingDataDto[], Error>> {
    try {
      return await this.getShowingsRepository.findShowingsWithFilters(filters);
    } catch (error) {
      return Err(new Error('Failed to retrieve showings'));
    }
  }

  async count (filters: any): Promise<number> {
    try {
      return await this.getShowingsRepository.count(filters);
    } catch (error) {
      throw new Error('Failed to count total showings');
    }
  }
}