// // backend/src/infrastructure/adapters/email/email.service.ts

// import { Injectable, OnModuleInit } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class EmailService implements OnModuleInit {
//   private transporter: nodemailer.Transporter;

//   async onModuleInit() {
//     this.transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
//       port: Number(process.env.EMAIL_PORT) || 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//   }

//   async sendWelcomeEmail(to: string): Promise<void> {
//     const mailOptions: nodemailer.sendMail = {
//       from: '"EveBox" <no-reply@evebox.com>',
//        // sender address
//         to, // list of receivers
//       // to: 'dev.hoangthanhnam.1008@gmail.com',
//       subject: 'Welcome to EveBox!', // Subject line
//       text: 'Thank you for registering with us.', // plain text body
//       html: '<b>Thank you for registering with us.</b>', // html body
//     };

//     await this.transporter.sendMail(mailOptions);
//   }

//   // Nếu bạn thêm các phương thức khác như sendRoleAssignedEmail
//   async sendRoleAssignedEmail(to: string, role: string): Promise<void> {
//     const mailOptions: nodemailer.SendMailOptions = {
//       from: '"EveBox" <no-reply@evebox.com>',
//       to,
//       subject: 'Your Role Has Been Updated',
//       text: `Your role has been updated to ${role}.`,
//       html: `<b>Your role has been updated to ${role}.</b>`,
//     };

//     await this.transporter.sendMail(mailOptions);
//   }
// }

// backend/src/infrastructure/adapters/email/email.service.ts

import { Injectable } from '@nestjs/common';
import { ResendService } from './resend/resend.service';

@Injectable()
export class EmailService {
  constructor(private readonly resendService: ResendService) {}

  /**
   * Sends a welcome email to the specified recipient.
   * @param to Recipient's email address.
   */
  async sendWelcomeEmail(to: string): Promise<void> {
    const from = 'welcome_email@resend.dev';
    const subject = 'Welcome to EveBox!';
    const text = 'Thank you for registering with us.';
    const html = '<b>Thank you for registering with us.</b>';

    await this.resendService.sendEmail(to, from, subject, text, html);
  }

  /**
   * Sends a role assignment email to the specified recipient.
   * @param to Recipient's email address.
   * @param role The role assigned to the user.
   */
  async sendRoleAssignedEmail(to: string, role: string): Promise<void> {
    const from = 'onboarding@resend.dev'; // Ensure this domain is verified in Resend
    const subject = 'Your Role Has Been Updated';
    const text = `Your role has been updated to ${role}.`;
    const html = `<b>Your role has been updated to ${role}.</b>`;

    await this.resendService.sendEmail(to, from, subject, text, html);
  }
}
