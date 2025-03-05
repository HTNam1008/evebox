// src/app.module.ts

import { Injectable, Module, NestMiddleware } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailModule } from './infrastructure/adapters/email/email.module';
import { EventModule } from './modules/event/event.module';
import { UserModule } from './modules/user/user.module';
import { ShowingModule } from './modules/showing/showing.module';
import { LocationModule } from './modules/location/location.module';
import { CloudinaryModule } from './infrastructure/adapters/cloudinary/cloudinary.module';
import { ImagesModule } from './modules/images/images.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService globally available
      envFilePath: '.env', // Path to .env file
    }),
    PrismaModule,
    CqrsModule,

    EmailModule,
    CloudinaryModule,

    UserModule,
    EventModule,
    ShowingModule,
    LocationModule,
    ImagesModule,
  ],
})

export class AppModule {}
