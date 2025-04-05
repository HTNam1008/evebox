import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}
  
  async get(key: string): Promise<any> {
    const data = await this.redisClient.get(key);
    if (!data) return null;
    
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    
    if (ttl) {
      await this.redisClient.set(key, stringValue, 'EX', ttl);
    } else {
      await this.redisClient.set(key, stringValue);
    }
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async delPattern(pattern: string): Promise<void> {
    const keys = await this.redisClient.keys(pattern);
    if (keys.length > 0) {
      await this.redisClient.del(...keys);
    }
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.redisClient.expire(key, seconds);
  }

  async ttl(key: string): Promise<number> {
    return this.redisClient.ttl(key);
  }

  async hset(key: string, field: string, value: any): Promise<void> {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    await this.redisClient.hset(key, field, stringValue);
  }

  async hget(key: string, field: string): Promise<any> {
    const data = await this.redisClient.hget(key, field);
    if (!data) return null;
    
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
}