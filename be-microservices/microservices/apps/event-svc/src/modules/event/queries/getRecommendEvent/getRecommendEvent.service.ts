import { Injectable } from '@nestjs/common';
import { GetRecommendEventRepository } from '../../repositories/getRecommendEvent.repository';
import { Result, Ok, Err } from 'oxide.ts';
import { GetEventRecommendDto } from './getRecommendEvent-response.dto';
import { IORedisService } from 'src/infrastructure/redis/ioredis.service';

@Injectable()
export class GetRecommendEventService {
  constructor(private readonly eventFrontDisplayRepository: GetRecommendEventRepository,
    private readonly ioRedisService: IORedisService,
  ) {}

  async getRecommendedEvents(timeWindow: "week" | "month"): Promise<Result<GetEventRecommendDto[], Error>> {
    const redisClient = this.ioRedisService.getClient();
    const cacheKey = `event:recommended:${timeWindow}`;
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return Ok(JSON.parse(cachedData));
      }
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

      await redisClient.set(cacheKey, JSON.stringify(recommendedEvents), 'EX', 24 * 60 * 60);
      return Ok(recommendedEvents);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch recommended events.'));
    }
  }
}
