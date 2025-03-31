import { Injectable } from '@nestjs/common';
import { GetEventFrontDisplayRepository } from '../../repositories/getEventFrontDisplay.repository';
import { Result, Ok, Err } from 'oxide.ts';
import { GetEventFrontDisplayDTO } from './getEventFrontDisplay-response.dto';
import { IORedisService } from 'src/infrastructure/redis/ioredis.service';

@Injectable()
export class GetEventFrontDisplayService {
  constructor(private readonly eventFrontDisplayRepository: GetEventFrontDisplayRepository,
    private readonly ioRedisService: IORedisService,
  ) {}

  async execute(): Promise<Result<GetEventFrontDisplayDTO, Error>> {
    const redisClient = this.ioRedisService.getClient();
    const cacheKey = `event:front-display`;
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return Ok(JSON.parse(cachedData));
      }
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

      await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 24 * 60 * 60);

      return Ok(result);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch front display data.'));
    }
  }
}
