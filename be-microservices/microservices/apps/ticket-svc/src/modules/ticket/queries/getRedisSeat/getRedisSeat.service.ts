import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { IORedisService } from 'src/infrastructure/redis/ioredis.service';
import { GetRedisSeatResponseData } from './getRedisSeat-response.dto';
import { getRedisSeatRepository } from '../../repositories/getRedisSeat.repository';
@Injectable()
export class GetRedisSeatService {
  constructor(
    private readonly redisService: IORedisService,
    private readonly getRedisSeatRepository: getRedisSeatRepository,
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
        const seatKey = `seat:${showingId}:*`;
        const seatKeys = await redis.keys(seatKey);
        const seatValue : number[] = []
        let ttl = 0;
        for (const key of seatKeys) {
          const value = await redis.get(key);
          if (value === email) {
            seatValue.push(parseInt(key.split(':')[2]));
          }
          ttl = await redis.ttl(key);
        }

        const seatPriceInfo = await this.getRedisSeatRepository.getSeatInfo(showingId, seatValue);
        if (!seatPriceInfo) {
          return Err(new Error('Seat not found'));
        }
        // const ttl = await redis.ttl(seatKey);
        return Ok({
          showingId: showingId,
          ticketTypeId: '',
          seatId: seatValue ? seatValue : [],
          quantity: 0,
          expiredTime: ttl,
          ticketTypeName: seatPriceInfo.ticketName,
          ticketTypePrice: seatPriceInfo.ticketPrice,
          totalAmount: seatPriceInfo.totalPrice,
        })
      }
      else{
        // Only can buy 1 ticketType at a time, so we only get the first key
        const ticketKey = ticketKeys[0];
        const seatValue = await redis.get(ticketKey);
        const ttl = await redis.ttl(ticketKey);
        const showingId = ticketKey.split(':')[1];
        const ticketTypeId = ticketKey.split(':')[2];
        const ticketTypeInfo = await this.getRedisSeatRepository.getTicketTypeInfo(ticketTypeId, seatValue ? JSON.parse(seatValue) : 0);
        if (!ticketTypeInfo) {
          return Err(new Error('Seat not found'));
        }

        return Ok({
          showingId: showingId,
          ticketTypeId: ticketTypeId,
          seatId: [],
          quantity: seatValue ? JSON.parse(seatValue) : 0,
          expiredTime: ttl,
          ticketTypeName: ticketTypeInfo.ticketName,
          ticketTypePrice: ticketTypeInfo.ticketPrice,
          totalAmount: ticketTypeInfo.totalPrice,
        })
      }
    } catch (error) {
      console.error(error);
      return Err(new Error('seat not found'));
    }
  }
  
  
  async logRedisData() {
    const redis = this.redisService.getClient();
    const keys = await redis.keys('*'); // Lấy toàn bộ key trong Redis
    
    console.log('=== Redis Data ===');
    for (const key of keys) {
      if(key.includes('event')) continue;
      const value = await redis.get(key);
      console.log(`Key: ${key}, Value: ${value}`);
    }
    console.log('==================');
  }  
}