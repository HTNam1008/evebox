// backend/src/infrastructure/adapters/email/resend.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Resend } from 'nestjs-resend';

@Injectable()
export class ResendService implements OnModuleInit {
  private resendClient: Resend;

  async onModuleInit() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined in environment variables');
    }
    this.resendClient = new Resend(apiKey);
  }

  /**
   * Sends an email using Resend.
   * @param to Recipient's email address.
   * @param from Sender's email address.
   * @param subject Email subject.
   * @param text Plain text content.
   * @param html HTML content.
   */
  async sendEmail(
    to: string,
    from: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    try {
      await this.resendClient.emails.send({
        from,
        to,
        subject,
        text,
        html,
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }
}
