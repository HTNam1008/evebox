// backend/src/infrastructure/adapters/email/resend.module.ts

import { Module, Global } from '@nestjs/common';
import { ResendService } from 'nestjs-resend';

@Global()
@Module({
  providers: [ResendService],
  exports: [ResendService],
})
export class ResendModule {}
