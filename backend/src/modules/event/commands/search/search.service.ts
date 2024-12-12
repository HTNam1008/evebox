import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../repositories/event.repository';

@Injectable()
export class SearchService {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(title: string) {
    const resultSearchEvent = await this.eventRepository.getEventsByTitle(title);

    if (!resultSearchEvent.length) {
      return {
        message: 'No events found',
        resultSearchEvent: [],
      };
    }

    return {
      resultSearchEvent,
    };
  }
}