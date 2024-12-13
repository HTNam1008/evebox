import { Injectable } from '@nestjs/common';
import { EventFrontDisplayRepository } from '../../repositories/event-frontdisplay.repository';
import { Result, Ok, Err } from 'oxide.ts';

export interface FrontDisplayData {
  specialEvents: any; // Thay `any` bằng kiểu dữ liệu tương ứng
  trendingEvents: any; 
  onlyOnEve: any;
  categorySpecial: any;
}

@Injectable()
export class FrontDisplayService {
  constructor(private readonly eventFrontDisplayRepository: EventFrontDisplayRepository) {}

  async execute(): Promise<Result<FrontDisplayData, Error>> {
    try {
      const specialEvents = await this.eventFrontDisplayRepository.getSpecialEvents();
      const trendingEvents = await this.eventFrontDisplayRepository.getTrendingEvents();
      const onlyOnEve = await this.eventFrontDisplayRepository.getOnlyOnEveEvents();
      const categorySpecial = await this.eventFrontDisplayRepository.getSpecialEventsByCategory();

      const result: FrontDisplayData = {
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
