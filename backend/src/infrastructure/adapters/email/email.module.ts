// backend/src/infrastructure/adapters/email/email.module.ts

import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ResendService } from './resend/resend.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], 
  providers: [ResendService, EmailService],
  exports: [EmailService],
})
export class EmailModule {}
