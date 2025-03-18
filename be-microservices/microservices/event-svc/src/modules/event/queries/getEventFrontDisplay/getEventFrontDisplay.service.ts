import { Injectable } from '@nestjs/common';
import { GetEventFrontDisplayRepository } from '../../repositories/getEventFrontDisplay.repository';
import { Result, Ok, Err } from 'oxide.ts';
import { GetEventFrontDisplayDTO } from './getEventFrontDisplay-response.dto';

@Injectable()
export class GetEventFrontDisplayService {
  constructor(private readonly eventFrontDisplayRepository: GetEventFrontDisplayRepository) {}

  async execute(): Promise<Result<GetEventFrontDisplayDTO, Error>> {
    try {
      const specialEvents = await this.eventFrontDisplayRepository.getSpecialEvents();
      const trendingEvents = await this.eventFrontDisplayRepository.getTrendingEvents();
      const onlyOnEve = await this.eventFrontDisplayRepository.getOnlyOnEveEvents();
      const categorySpecial = await this.eventFrontDisplayRepository.getSpecialEventsByCategory();

      const result: GetEventFrontDisplayDTO = {
        specialEvents,
        trendingEvents,
        onlyOnEve,
        categorySpecial,
      };

      return Ok(result);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch front display data.'));
    }
  }
}
