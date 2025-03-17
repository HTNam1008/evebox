// src/app.module.ts

import { Injectable, Module, NestMiddleware } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { PayOSModule } from './infrastructure/adapters/payment/payOS/payOS.module';
import { IORedisModule } from './infrastructure/redis/ioredis.module';
import { ShowingModule } from './modules/showing/showing.module';
import { PaymentModule } from './modules/payment/payment.module';
// import { TempModule } from './modules/(temp)/temp.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService globally available
      envFilePath: '.env', // Path to .env file
    }),
    ConfigModule,
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    CqrsModule,
    PayOSModule,
    IORedisModule,

    ShowingModule,
    PaymentModule,
    TicketModule,
    // TempModule,
  ],
  providers: [
    JwtStrategy,
  ]
})

export class AppModule {}
