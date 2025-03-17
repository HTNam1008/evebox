import { Injectable } from "@nestjs/common";
import { GetEventDetailRecommendRepository } from "../../repositories/getEventDetailRecommend.repository";
import { Result, Ok, Err } from "oxide.ts";
import { GetEventDetailRecommendDto} from "./getEventDetailRecommend-response.dto"
import e from "express";

@Injectable()
export class GetEventDetailRecommendService {
  constructor(private readonly eventDetailRepository: GetEventDetailRecommendRepository) {}

  async getRecommendedEventsInDetail(eventId: number, limit: string): Promise<Result<GetEventDetailRecommendDto[], Error>> {
    if (!eventId) {
      return Err(new Error("Event ID is required."));
    }
    try {
      if (!limit) {
        limit = "20";
      }
      const recommendedEvents = await this.eventDetailRepository.getRecommendedEventsInDetail(eventId, limit);

      return Ok(recommendedEvents);
    } catch (error) {
      console.error(error);
      return Err(new Error("Event not found."));
    }
  }

}