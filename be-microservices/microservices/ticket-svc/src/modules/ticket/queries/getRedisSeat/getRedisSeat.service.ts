import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { IORedisService } from 'src/infrastructure/redis/ioredis.service';
import { GetRedisSeatResponseData } from './getRedisSeat-response.dto';

@Injectable()
export class GetRedisSeatService {
  constructor(
    private readonly redisService: IORedisService,
  ) {}
  async execute(showingId: string, email: string): Promise<Result<GetRedisSeatResponseData, Error>> {
    try {
      const redis = this.redisService.getClient();
      if (!showingId) {
        return Err(new Error('Showing ID is required'));
      }
      if (!email) {
        return Err(new Error('Email is required'));
      }

      const key = `ticket:${showingId}:*:${email}`;
      const ticketKeys = await redis.keys(key);
      if (ticketKeys.length === 0) {
        const seatKey = `seat:${showingId}:${email}`;
        const seatValue = await redis.get(seatKey);
        return Ok({
          showingId: showingId,
          ticketTypeId: '',
          seatId: seatValue ? JSON.parse(seatValue) : [],
          quantity: 0,
        })
      }
      else{
        const ticketKey = ticketKeys[0];
        const seatValue = await redis.get(ticketKey);
        const ttl = await redis.ttl(ticketKey);
        const showingId = ticketKey.split(':')[1];
        const ticketTypeId = ticketKey.split(':')[2];
        return Ok({
          showingId: showingId,
          ticketTypeId: ticketTypeId,
          seatId: [],
          quantity: seatValue ? JSON.parse(seatValue).length : 0,
          expiredTime: ttl,
        })
      }
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to select seat'));
    }
  }
  
  
  async logRedisData() {
    const redis = this.redisService.getClient();
    const keys = await redis.keys('*'); // Lấy toàn bộ key trong Redis
    
    console.log('=== Redis Data ===');
    for (const key of keys) {
      const value = await redis.get(key);
      console.log(`Key: ${key}, Value: ${value}`);
    }
    console.log('==================');
  }  
}