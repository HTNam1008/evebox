import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from 'oxide.ts';
import { GetEventFrontDisplayRepository } from "../../repositories/getEventFrontDisplay.repository";
import { GetEventFDByIdsResponseDto } from "./getEventFDByIds-response.dto";

@Injectable()
export class GetEventFDByIdsService {
  constructor(private readonly eventFrontDisplayRepository: GetEventFrontDisplayRepository) {}

  async execute(ids: number[]): Promise<Result<GetEventFDByIdsResponseDto[], Error>> {
    try {
      const events = await this.eventFrontDisplayRepository.getEventFDByIds(ids);
      if (!events || events.length === 0) {
        return Err(new Error("No events found for the provided IDs."));
      }
      return Ok(events);
    } catch (error) {
      console.error(error);
      return Err(new Error("Failed to fetch events by IDs."));
    }
  }
}