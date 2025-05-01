"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('EMAIL_HOST'),
            port: this.configService.get('EMAIL_PORT', 587),
            secure: false,
            auth: {
                user: this.configService.get('EMAIL_USERNAME'),
                pass: this.configService.get('EMAIL_PASS'),
            },
        });
    }
    async sendWelcomeEmail(to) {
        const mailOptions = {
            from: `"EveBox" <${this.configService.get('EMAIL_USER', 'hello@evebox.studio')}>`,
            to,
            subject: 'Welcome to EveBox!',
            text: 'Thank you for registering with us.',
            html: '<b>Thank you for registering with us.</b>',
        };
        console.log("Send email to: ", to);
        await this.transporter.sendMail(mailOptions);
    }
    async sendRoleAssignedEmail(to, role) {
        const mailOptions = {
            from: `"EveBox" <${this.configService.get('EMAIL_USER', 'hello@evebox.studio')}>`,
            to,
            subject: 'Your Role Has Been Updated',
            text: `Your role has been updated to ${role}.`,
            html: `<b>Your role has been updated to ${role}.</b>`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendOTPEmail(email, otp, type) {
        console.log("send otp email: ", email, otp, type);
        const appName = this.configService.get('APP_NAME', 'EveBox');
        switch (type) {
            case 'FORGOT_PASSWORD':
                try {
                    await this.transporter.sendMail({
                        from: `"${appName}" <${this.configService.get('EMAIL_USER', 'hello@evebox.studio')}>`,
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
                }
                catch (error) {
                    console.error('Failed to send OTP email:', error);
                    throw new Error('Failed to send OTP email');
                }
                break;
            case 'REGISTER':
                try {
                    await this.transporter.sendMail({
                        from: `"${appName}" <${this.configService.get('EMAIL_USER', 'hello@evebox.studio')}>`,
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
                }
                catch (error) {
                    console.error('Failed to send OTP email:', error);
                    throw new Error('Failed to send OTP email');
                }
                break;
            default:
                throw new Error('Invalid OTP type');
        }
    }
    async sendPasswordResetConfirmation(email) {
        const appName = this.configService.get('APP_NAME', 'EveBox');
        await this.transporter.sendMail({
            from: `"${appName}" <${this.configService.get('EMAIL_FROM', 'hello@evebox.studio')}>`,
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
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map