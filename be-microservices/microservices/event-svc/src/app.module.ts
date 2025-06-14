// src/app.module.ts

import { Injectable, Module, NestMiddleware } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailModule } from './infrastructure/adapters/email/email.module';
import { EventModule } from './modules/event/event.module';
import { UserModule } from './modules/user/user.module';
import { LocationModule } from './modules/location/location.module';
import { CloudinaryModule } from './infrastructure/adapters/cloudinary/cloudinary.module';
import { ImagesModule } from './modules/images/images.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { ShowingModule } from './modules/showing/showing.module';
import { TicketTypeModule } from './modules/ticketType/ticketType.module';
import { PaymentModule } from './modules/payment/payment.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { AdminModule } from './modules/admin/admin.module';
import { IORedisModule } from './infrastructure/redis/ioredis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService globally available
      envFilePath: '.env', // Path to .env file
    }),
    PrismaModule,
    IORedisModule,
    CqrsModule,

    EmailModule,
    CloudinaryModule,

    UserModule,
    LocationModule,
    ImagesModule,
    AdminModule,
    EventModule,
    ShowingModule,
    TicketTypeModule,
    PaymentModule,
    StatisticsModule
  ],
})

export class AppModule {}
