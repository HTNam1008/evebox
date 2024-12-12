import { Injectable } from "@nestjs/common";
import { EventRepository } from "../../repositories/event.repository";

@Injectable()
export class RecommendService {
  constructor(private readonly eventRepository: EventRepository) {}

  async getRecommendedEvents(eventId: number) {
    const recommendEvents = await this.eventRepository.getRecommendedEvents(eventId);

    if (!recommendEvents.length) {
      return [];
    }

    return recommendEvents;
  }
}