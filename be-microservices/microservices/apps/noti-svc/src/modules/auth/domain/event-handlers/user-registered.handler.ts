import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { EmailService } from 'src/infrastructure/adapter/email/email.service';
import { IUserRegisteredEvent } from '../events/user-registered.event';

@Controller()
export class UserRegisteredHandler {
  constructor(private emailService: EmailService) {}

  @EventPattern('user_registered')
  async handleUserRegistered(@Payload() data: IUserRegisteredEvent) {
    try {
      Logger.log('Received user registered event:', data);
      await this.emailService.sendWelcomeEmail(data.email);
      Logger.log('Sent welcome email to:', data.email);
    } catch (error) {
      Logger.error('Failed to send welcome email:', error);
    }
  }
}