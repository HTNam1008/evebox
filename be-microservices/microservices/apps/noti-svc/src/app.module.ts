import { Module } from '@nestjs/common';
import { EmailModule } from './infrastructure/adapter/email/email.module';
import { KafkaConsumer } from './infrastructure/adapter/messaging/kafka.consumer';
import { UserRegisteredHandler } from './modules/auth/domain/event-handlers/user-registered.handler';
import { ConfigModule } from '@nestjs/config';
import { UserResetPasswordHandler } from './modules/auth/domain/event-handlers/user-reset-password.handler';
import { SendEmailOtpEventHandler } from './modules/auth/domain/event-handlers/send-email-otp.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EmailModule
  ],
  controllers: [
    UserRegisteredHandler,
    UserResetPasswordHandler,
    SendEmailOtpEventHandler,
  ],
  providers: [KafkaConsumer],
})
export class AppModule {}