// backend/src/infrastructure/adapters/email/email.service.ts

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT', 587),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
      logger: true,
      // debug: true,
    });

    try {
      await this.transporter.verify();
      Logger.log('SMTP server connection verified');
    } catch (err) {
      Logger.error('SMTP connection error:', err);
    }
  }

  async sendWelcomeEmail(to: string, retries = 3): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"EveBox" <${this.configService.get<string>('EMAIL_USER', 'hello@evebox.studio')}>`,
      to,
      subject: 'Welcome to EveBox!',
      text: 'Thank you for registering with us.',
      html: '<b>Thank you for registering with us.</b>',
    };

    try {
      await this.transporter.sendMail(mailOptions);
      Logger.log('Email sent successfully to:', to);
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await this.sendWelcomeEmail(to, retries - 1);
        Logger.log(`Retrying to send email... Attempts left: ${retries - 1}`);
      } else {
        Logger.error('Failed to send email after retries:', err);
        throw new Error('Failed to send email after retries');
      }
    }
  }

  // async sendForgotPassword(to: string): Promise<void> {
  //   const mailOptions: nodemailer.SendMailOptions = {
  //     from: `"EveBox" <${this.configService.get<string>('EMAIL_USER', 'hello@evebox.studio')}>`,
  //     to,
  //     subject: 'EveBox - Forgot Password!',
  //     text: 'Thank you for registering with us.',
  //     html: '<b>Thank you for registering with us.</b>',
  //   };

  //   console.log("Send email to: ", to);
  //   await this.transporter.sendMail(mailOptions);
  // }

  async sendRoleAssignedEmail(
    to: string,
    role: string,
    retries = 3,
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"EveBox" <${this.configService.get<string>('EMAIL_USER', 'hello@evebox.studio')}>`,
      to,
      subject: 'Your Role Has Been Updated',
      text: `Your role has been updated to ${role}.`,
      html: `<b>Your role has been updated to ${role}.</b>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      Logger.log('Email sent successfully to:', to);
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await this.sendRoleAssignedEmail(to, role, retries - 1);
        Logger.log(`Retrying to send email... Attempts left: ${retries - 1}`);
      } else {
        Logger.error('Failed to send email after retries:', err);
        throw new Error('Failed to send email after retries');
      }
    }
  }

  async sendOTPEmail(
    email: string,
    otp: string,
    type: string,
    expiresAt: number,
    retries = 3,
  ): Promise<void> {
    const appName = this.configService.get<string>('APP_NAME', 'EveBox');
    switch (type) {
      case 'FORGOT_PASSWORD':
        try {
          await this.transporter.sendMail({
            from: `"${appName}" <${this.configService.get<string>('EMAIL_USER', 'hello@evebox.studio')}>`,
            to: email,
            subject: `${appName} - Password Reset OTP`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Password Reset Request</h2>
                <p>You have requested to reset your password. Please use the following OTP code to proceed:</p>
                <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
                  <strong>${otp}</strong>
                </div>
                <p>This OTP will expire in ${expiresAt} minutes.</p>
                <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
                <p>Best regards,<br>${appName} Team</p>
              </div>
            `,
          });
          Logger.log('Email sent successfully to:', email);
        } catch (err) {
          if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await this.sendOTPEmail(email, otp, type, retries - 1);
            Logger.log(
              `Retrying to send email... Attempts left: ${retries - 1}`,
            );
          } else {
            Logger.error('Failed to send email after retries:', err);
            throw new Error('Failed to send email after retries');
          }
        }
        break;

      case 'REGISTER':
        try {
          await this.transporter.sendMail({
            from: `"${appName}" <${this.configService.get<string>('EMAIL_USER', 'hello@evebox.studio')}>`,
            to: email,
            subject: `${appName} - Registration OTP`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 10px;">
                <h2 style="color: #333333; text-align: center;">Welcome to ${appName}!</h2>
                <p style="color: #333333; font-size: 16px;">Thank you for registering with us. Please use the OTP code below to complete your registration:</p>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0; border: 1px solid #eaeaea; border-radius: 5px;">
                  ${otp}
                </div>
                <p style="color: #333333; font-size: 14px;">This OTP will expire in <strong>${expiresAt} minutes</strong>.</p>
                <p style="color: #333333; font-size: 14px;">If you did not initiate this registration, please ignore this email or contact our support team immediately.</p>
                <p style="color: #333333; font-size: 14px;">Best regards,<br>${appName} Team</p>
              </div>
            `,
          });
          Logger.log('Email sent successfully to:', email);
        } catch (err) {
          if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await this.sendOTPEmail(email, otp, type, retries - 1);
            Logger.log(
              `Retrying to send email... Attempts left: ${retries - 1}`,
            );
          } else {
            Logger.error('Failed to send email after retries:', err);
            throw new Error('Failed to send email after retries');
          }
        }
        break;
      default:
        throw new Error('Invalid OTP type');
    }
  }

  async sendPasswordResetConfirmation(email: string, retries = 3): Promise<void> {
    const appName = this.configService.get<string>('APP_NAME', 'EveBox');

    try {
      await this.transporter.sendMail({
        from: `"${appName}" <${this.configService.get<string>('EMAIL_FROM', 'hello@evebox.studio')}>`,
        to: email,
        subject: `${appName} - Password Reset Successful`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Successful</h2>
          <p>Your password has been successfully reset.</p>
          <p>If you did not perform this action, please contact our support team immediately.</p>
          <p>Best regards,<br>${appName} Team</p>
        </div>
      `,
      });

      Logger.log('Email sent successfully to:', email);
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await this.sendPasswordResetConfirmation(email, retries - 1);
        Logger.log(`Retrying to send email... Attempts left: ${retries - 1}`);
      } else {
        Logger.error('Failed to send email after retries:', err);
        throw new Error('Failed to send email after retries');
      }
    }
  }
}
