import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../repositories/event.repository';

@Injectable()
export class SearchService {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(title: string) {
    const events = await this.eventRepository.getEventsByTitle(title);

    if (!events.length) {
      return {
        message: 'No events found',
        events: [],
      };
    }

    return {
      events,
    };
  }
}