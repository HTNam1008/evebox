// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailModule } from './infrastructure/adapters/email/email.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService globally available
      envFilePath: '.env', // Path to .env file
    }),
    UserModule,
    CqrsModule,
    EmailModule,
    // Add any other modules here if needed
    EventModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
