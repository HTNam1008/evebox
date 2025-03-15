import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { IORedisService } from 'src/infrastructure/redis/ioredis.service';
import e from 'express';

@Injectable()
export class UnSelectSeatService {
  constructor(
    private readonly redisService: IORedisService,
  ) {}
  async execute(showingId: string, email: string): Promise<Result<Boolean, Error>> {
    try {
      console.log(showingId, email);
      const redis = this.redisService.getClient();
      const ticketKey = `ticket:${showingId}:*:${email}`;
      if (await redis.exists(ticketKey)) {
        const ticketKeys = await redis.keys(ticketKey);
        for (const key of ticketKeys) {
          await redis.del(key);
        }
      }
      const seatKey = `seat:${showingId}:${email}`;
      if (await redis.exists(seatKey)) {
        await redis.del(seatKey);
      }
      return Ok(true);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to unselect seat'));
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