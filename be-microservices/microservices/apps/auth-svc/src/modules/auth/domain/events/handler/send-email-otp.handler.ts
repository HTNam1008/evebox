import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';

import { SendEmailOTPDomainEvent } from '../user/send-email-otp.domain-event';
import { KafkaService } from 'src/infrastructure/adapters/kafka/kafka.service';

@Injectable()
@EventsHandler(SendEmailOTPDomainEvent)
export class SendEmailOtpHandler 
  implements IEventHandler<SendEmailOTPDomainEvent> {
  
  constructor(private readonly kafkaService: KafkaService) {}

  async handle(event: SendEmailOTPDomainEvent): Promise<void> {
    const { email, otp, type, expiresAt } = event;
    Logger.log("OTP: ", otp);
    await this.kafkaService.emitSendEmailOtpEvent({
      email: email,
      otp: otp,
      type: type,
      expiresAt: expiresAt,
    });
  }
}
