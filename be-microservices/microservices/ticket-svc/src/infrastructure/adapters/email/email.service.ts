// backend/src/infrastructure/adapters/email/email.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { UserTicketByIdDto } from 'src/modules/(temp)/ticketSendmail/getUserTicketById/ticketInfo.entity';

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
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendOTPEmail(email: string, otp: string, type: string): Promise<void> {
    console.log("send otp email: ", email, otp, type);
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
                <p>This OTP will expire in 15 minutes.</p>
                <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
                <p>Best regards,<br>${appName} Team</p>
              </div>
            `,
          });
        } catch (error) {
          console.error('Failed to send OTP email:', error);
          throw new Error('Failed to send OTP email');
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
                <p style="color: #333333; font-size: 14px;">This OTP will expire in <strong>15 minutes</strong>.</p>
                <p style="color: #333333; font-size: 14px;">If you did not initiate this registration, please ignore this email or contact our support team immediately.</p>
                <p style="color: #333333; font-size: 14px;">Best regards,<br>${appName} Team</p>
              </div>
            `,
          });
        } catch (error) {
          console.error('Failed to send OTP email:', error);
          throw new Error('Failed to send OTP email');
        }
        break;
      default:
        throw new Error('Invalid OTP type');
    }
  }

  async sendTicketEmail(data: UserTicketByIdDto, pdf: { name: string; content: Buffer; type: string }[]){
    const receive_email = "baobao11062003@gmail.com"
    // console.log(this.configService.get<string>('EMAIL_USER', 'sp.bs.evebox@gmail.com'))
    // console.log(this.configService.get<string>('EMAIL_HOST', 'smtp.gmail.com'))
    // console.log(this.configService.get<string>('EMAIL_PORT', '587'))
    // console.log(this.configService.get<string>('EMAIL_PASS', '587'))


    try{
      const res = await this.transporter.sendMail({
        from: `EveBox <${this.configService.get<string>('EMAIL_USER', 'sp.bs.evebox@gmail.com')}>`,
        to: receive_email,
        subject: `Your ticket for ${data.Showing.Events.title}`,
        html: `
        <p style="color: #333333; font-size: 14px;">If you did not initiate this registration, please ignore this email or contact our support team immediately.</p>
        <p style="color: #333333; font-size: 14px;">If you did not initiate this registration, please ignore this email or contact our support team immediately.</p>
        <p style="color: #333333; font-size: 14px;">If you did not initiate this registration, please ignore this email or contact our support team immediately.</p>
        <p style="color: #333333; font-size: 14px;">If you did not initiate this registration, please ignore this email or contact our support team immediately.</p>
        <p style="color: #333333; font-size: 14px;">If you did not initiate this registration, please ignore this email or contact our support team immediately.</p>
        `,
        attachments: pdf.map((file) => {
          return {
            filename: file.name,
            content: file.content,
            contentType: file.type,
          };
        }),
      });
    }
    catch (error) {
      console.error('Failed to send ticket email:', error);
      throw new Error('Failed to send ticket email');
    }
  }
}
