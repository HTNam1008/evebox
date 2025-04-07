import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { EmailService } from 'src/infrastructure/adapter/email/email.service';
import { IUserResetPasswordEvent } from '../events/user-reset-password.event';

@Controller()
export class UserResetPasswordHandler {
  constructor(private emailService: EmailService) {}

  @EventPattern('user_reset_password')
  async handleUserResetPassword(@Payload() data: IUserResetPasswordEvent) {
    try {
      Logger.log('Received user reset password event:', data);
      await this.emailService.sendWelcomeEmail(data.email);
      Logger.log('Sent reset password email to:', data.email);
    } catch (error) {
      Logger.error('Failed to send reset password email:', error);
    }
  }
}