import { Injectable } from '@nestjs/common';
import { EventFrontDisplayRepository } from '../../repositories/event-frontdisplay.repository';
import { Result, Ok, Err } from 'oxide.ts';
import { FrontDisplayData, EventFrontDisplay } from '../../domain/entities/event.entity';

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
  
  async getRecommendedEvents(timeWindow: "week" | "month"): Promise<Result<EventFrontDisplay[], Error>> {
    try {
      const now = new Date();

      let endDate: Date;

      if (timeWindow === 'week') {
        const remainingDays = 7 - now.getDay();
        endDate = new Date(now);
        endDate.setDate(now.getDate() + remainingDays);
        endDate.setHours(23, 59, 59, 999);
      } else if (timeWindow === 'month') {
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDate.setHours(23, 59, 59, 999);
      } else {
        throw new Error('Invalid timeWindow value. Use "week" or "month".');
      }

      console.log('endDate', endDate, 'now', now);
      const recommendedEvents = await this.eventFrontDisplayRepository.getRecommendedEvents(now, endDate);

      return Ok(recommendedEvents);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch recommended events.'));
    }
  }
}
