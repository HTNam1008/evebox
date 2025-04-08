import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private client: ClientKafka,
  ) {}

  async onModuleInit() {
    // Kết nối đến topic khi khởi động (nếu cần)
    await this.client.connect();
    Logger.log(`Kafka Producer ready | Brokers: ${process.env.KAFKA_BROKERS}`);
  }

  emitUserRegisteredEvent(user: {email: string }) {
    this.client.emit('user_registered', {
      event: 'USER_REGISTERED',
      email: user.email,
      timestamp: new Date().toISOString(),
    });
    Logger.log(`Emitted user_registered event: ${JSON.stringify(user.email)}`);
  }

  emitUserResetPasswordEvent(user: {email: string }) {
    this.client.emit('user_reset_password', {
      event: 'USER_RESET_PASSWORD',
      email: user.email,
      timestamp: new Date().toISOString(),
    });
    Logger.log(`Emitted user_reset_password event: ${JSON.stringify(user.email)}`);
  }

  emitSendEmailOtpEvent(user: {email: string, otp: string, type: string, expiresAt: number }) {
    this.client.emit('send_otp', {
      event: 'SEND_EMAIL_OTP',
      email: user.email,
      otp: user.otp,
      type: user.type,
      expiresAt: user.expiresAt,
      timestamp: new Date().toISOString(),
    });
    Logger.log(`Emitted send_email_otp event: ${JSON.stringify(user.email)}`);
  }
}