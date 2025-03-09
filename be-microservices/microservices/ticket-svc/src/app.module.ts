// src/app.module.ts

import { Injectable, Module, NestMiddleware } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { PayOSModule } from './infrastructure/adapters/payment/payOS/payOS.module';
import { IORedisModule } from './infrastructure/redis/ioredis.module';
import { ShowingModule } from './modules/showing/showing.module';
import { PaymentModule } from './modules/payment/payment.module';
import { TempModule } from './modules/(temp)/temp.module';
import { TicketModule } from './modules/ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService globally available
      envFilePath: '.env', // Path to .env file
    }),
    PrismaModule,
    CqrsModule,
    PayOSModule,
    IORedisModule,

    ShowingModule,
    PaymentModule,
    TicketModule,
    TempModule,
  ],
})

export class AppModule {}
