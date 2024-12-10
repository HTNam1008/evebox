import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../repositories/event.repository';

@Injectable()
export class FrontDisplayService {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute() {
    const specialEvents = await this.eventRepository.getSpecialEvents();
    const trendingEvents = await this.eventRepository.getTrendingEvents();
    const onlyOnEve = await this.eventRepository.getOnlyOnEveEvents();
    const categorySpecial = await this.eventRepository.getSpecialEventsByCategory();

    return {
      specialEvents,
      trendingEvents,
      onlyOnEve,
      categorySpecial,
    };
  }
}
