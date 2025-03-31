import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export interface RedisModuleOptions {
  keyPrefix?: string;
}

@Global()
@Module({})
export class RedisModule {
  static register(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true, // Makes ConfigService globally available
          envFilePath: '.env', // Path to .env file
        }),
      ],
      providers: [
        {
          provide: 'REDIS_OPTIONS',
          useValue: options,
        },
        {
          provide: 'REDIS_CLIENT',
          useFactory: (
            redisOptions: RedisModuleOptions,
            configService: ConfigService
            ) => {
            const redisClient = new Redis({
              sentinels: [
                {
                  host: configService.get<string>('REDIS_SENTINEL_1_HOST'),
                  port: configService.get<number>('REDIS_SENTINEL_1_PORT'),
                },
                {
                  host: configService.get<string>('REDIS_SENTINEL_2_HOST'),
                  port: configService.get<number>('REDIS_SENTINEL_2_PORT'),
                },
                {
                  host: configService.get<string>('REDIS_SENTINEL_3_HOST'),
                  port: configService.get<number>('REDIS_SENTINEL_3_PORT'),
                },
              ],
              name: configService.get<string>('REDIS_MASTER_NAME') || 'mymaster',
              password: configService.get<string>('REDIS_PASSWORD') || undefined,
              db: configService.get<number>('REDIS_DB') || 0,
              keyPrefix: redisOptions.keyPrefix || '',
              showFriendlyErrorStack: true,
              enableReadyCheck: true,
              retryStrategy: (times) => {
                // Retry strategy
                const delay = Math.min(times * 100, 3000);
                return delay;
              },
              reconnectOnError: (err) => {
                const targetError = 'READONLY';
                if (err.message.includes(targetError)) {
                  return true;
                }
                return false;
              },
            });

            redisClient.on('connect', () => {
              console.log('[Redis] Connected to Redis');
            });

            redisClient.on('ready', () => {
              console.log('[Redis] Redis is ready');
            });

            redisClient.on('error', (err) => {
              console.error('[Redis] Error:', err);
            });

            redisClient.on('+switch-master', (master, oldHost, oldPort, newHost, newPort) => {
              console.log(`[Redis] Master switched from ${oldHost}:${oldPort} to ${newHost}:${newPort}`);
            });

            return redisClient;
          },
          inject: ['REDIS_OPTIONS', ConfigService],
        },
      ],
      exports: ['REDIS_CLIENT'],
    };
  }
}