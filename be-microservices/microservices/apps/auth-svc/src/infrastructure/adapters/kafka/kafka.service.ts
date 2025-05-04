import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private client: ClientKafka,
  ) {}

  async onModuleInit() {
    // Kß║┐t nß╗æi ─æß║┐n topic khi khß╗ƒi ─æß╗Öng (nß║┐u cß║ºn)
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


  emitUserCreatedEvent(user: {user_id: string, name: string, email: string, status: string, role_id: number }) {
    this.client.emit('user_created', {
      event: 'USER_CREATED',
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      status: user.status,
      role_id: user.role_id,
      timestamp: new Date().toISOString(),
    });
    Logger.log(`Emitted user_created event: ${JSON.stringify(user.email)}`);
  }
}
