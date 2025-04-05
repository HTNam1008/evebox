import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { EmailService } from 'src/infrastructure/adapter/email/email.service';
import { ISendEmailOtpEvent } from '../events/send-email-otp.event';

@Controller()
export class SendEmailOtpEventHandler {
  constructor(private emailService: EmailService) {}

  @EventPattern('send_otp')
  async handleSendOtpEmail(@Payload() data: ISendEmailOtpEvent) {
    try {
      Logger.log('Received send otp event:', data);
      await this.emailService.sendOTPEmail(data.email, data.otp, data.type, data.expiresAt);
      Logger.log('Send otp to:', data.email);
    } catch (error) {
      Logger.error('Failed to send otp:', error);
    }
  }
}