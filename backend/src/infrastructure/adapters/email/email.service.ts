// backend/src/infrastructure/adapters/email/email.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  async onModuleInit() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendWelcomeEmail(to: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: '"EveBox" <no-reply@evebox.com>', // sender address
      to, // list of receivers
      subject: 'Welcome to EveBox!', // Subject line
      text: 'Thank you for registering with us.', // plain text body
      html: '<b>Thank you for registering with us.</b>', // html body
    };

    await this.transporter.sendMail(mailOptions);
  }

  // Nếu bạn thêm các phương thức khác như sendRoleAssignedEmail
  async sendRoleAssignedEmail(to: string, role: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: '"EveBox" <no-reply@evebox.com>',
      to,
      subject: 'Your Role Has Been Updated',
      text: `Your role has been updated to ${role}.`,
      html: `<b>Your role has been updated to ${role}.</b>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
