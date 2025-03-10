import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { IORedisService } from 'src/infrastructure/redis/ioredis.service';
import { SelectSeatDto } from './selectSeat.dto';
import { SelectSeatRepository } from '../../repositories/selectSeat.repository';
import e from 'express';

@Injectable()
export class SelectSeatService {
  constructor(
    private readonly redisService: IORedisService,
    private selectSeatRepository: SelectSeatRepository,
  ) {}
  async execute(selectSeatDto: SelectSeatDto, email: string): Promise<Result<Boolean, Error>> {
    try {
      const redis = this.redisService.getClient();
      const seatInfo = selectSeatDto.seatInfo;

      // **Case 1: Lock theo số lượng ghế (`quantity`)**
      const key = `ticket:${selectSeatDto.showingId}:${selectSeatDto.tickettypeId}:${email}`;
      const keyExists = await redis.exists(key);
      if (keyExists) {
        await redis.del(key);
      }
      // **🔹 Lấy tất cả các key chứa ghế đã giữ**
      const seatKeys = await redis.keys(`ticket:${selectSeatDto.showingId}:${selectSeatDto.tickettypeId}:*`);
      console.log('seatKeys', seatKeys);
      // **🔹 Lấy toàn bộ giá trị của các key đó**
      const seatValues = seatKeys.length > 0 ? await redis.mget(seatKeys) : [];
      console.log('seatValues', seatValues);
      // **🔹 Tính tổng số ghế đã giữ**
      const currentSeatCount = seatValues.reduce((sum, value) => sum + (value ? parseInt(value, 10) : 0), 0);
      console.log('currentSeatCount', currentSeatCount);
      const maxSeatData = await this.selectSeatRepository.getTicketQuantity(selectSeatDto.showingId, selectSeatDto.tickettypeId);
      const maxSeat = maxSeatData ? maxSeatData.quantity : 0; 
      if (seatInfo.length === 0) {
        if (selectSeatDto.quantity > 0 && maxSeat && (selectSeatDto.quantity + currentSeatCount) <= maxSeat) {
          await redis.set(key, selectSeatDto.quantity, 'EX', 1200);
          return Ok(true);
        }
        return Err(new Error('Not enough seats available'));
      }
      else{
        // **Case 2: Lock ghế cụ thể**
        const keyExists = await redis.keys(`seat:${selectSeatDto.showingId}:*`);
        for (const keyEx of keyExists) {
          const value = await redis.get(keyEx);
          if (value === email) {
            await redis.del(keyEx);
          }
        }
    
        for (const seat of seatInfo) {
          const seatKey = `seat:${selectSeatDto.showingId}:${seat.seatId}`;
          const seatExists = await redis.exists(seatKey);
          if (seatExists) {
            return Err(new Error('Seat is already selected'));
          }
        }
    
        for (const seat of seatInfo) {
          const seatKey = `seat:${selectSeatDto.showingId}:${seat.seatId}`;
          await redis.set(seatKey, email, 'EX', 1200);
        }
        return Ok(true);
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