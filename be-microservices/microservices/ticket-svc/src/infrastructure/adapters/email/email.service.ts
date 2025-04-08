// backend/src/infrastructure/adapters/email/email.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { UserTicketByIdDto } from 'src/modules/(temp)/ticketSendmail/getUserTicketById/ticketInfo.entity';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) { }

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

  async sendTicketEmail(data: UserTicketByIdDto, pdf: { name: string; content: Buffer; type: string }[]) {
    const receive_email = "thanhhue12155@gmail.com"

    const webUrl = this.configService.get<string>('WEB_URL', 'http://localhost:3000');
    const ticketLink = `${webUrl}/ticket/${data.id}`;

    let formAnswersHtml = '';

    for (const answer of data.FormResponse.FormAnswer) {
      formAnswersHtml += `<p><strong>${answer.FormInput.fieldName}:</strong> ${answer.value}</p>\n`;
    }

    // console.log(this.configService.get<string>('EMAIL_USER', 'sp.bs.evebox@gmail.com'))
    // console.log(this.configService.get<string>('EMAIL_HOST', 'smtp.gmail.com'))
    // console.log(this.configService.get<string>('EMAIL_PORT', '587'))
    // console.log(this.configService.get<string>('EMAIL_PASS', '587'))


    try {
      const res = await this.transporter.sendMail({
        from: `EveBox <${this.configService.get<string>('EMAIL_USER', 'sp.bs.evebox@gmail.com')}>`,
        to: [receive_email, "baobao11062003@gmail.com"],
        subject: `Your ticket for ${data.Showing.Events.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0C4762; padding: 15px; color: white; text-align: center; font-size: 20px; font-weight: bold;">Evebox</div>
            <div style="padding: 20px;">
                <h2 style="color: #333; font-size: 18px; text-align: center;">Thông tin vé</h2>
                <p><strong>${data.Showing.Events.title}</strong></p>
                <p><strong>⏰ ${new Date(data.Showing.startTime).toLocaleTimeString()} - ${new Date(data.Showing.startTime).toLocaleDateString()}</strong></p>
                <p>📍 <strong>${data.Showing.Events.venue}</strong></p>
                <p>${data.Showing.Events.locationsString}</p>

                <a style="display: block; margin: 0 auto; background-color: #51DACF; color: #0C4762; text-align: center; padding: 10px; border-radius: 4px; font-weight: bold; text-decoration: none;"
                  target="_blank" href="${ticketLink}">
                  Vé đã mua
                </a>

                <p style="margin-top: 15px;">Vé điện tử của bạn cũng được đính kèm trong email này. Vui lòng chuẩn bị sẵn vé điện tử tại nơi soát vé.</p>
                
                <p><strong>Mã đơn hàng:</strong> ${data.id}</p>
                <p style="font-size: 12px; color: gray;">(Dùng khi liên hệ bộ phận Chăm sóc Khách hàng)</p>
                
                <p><strong>Điều khoản và điều kiện</strong></p>
                <p>- Không hoàn tiền cho vé đã thanh toán</p>
                <p>- Người mua phải trình vé ở cửa để tham gia sự kiện hoặc bất kỳ thời điểm nào được yêu cầu</p>
                <p>- Khi mua vé, tức là người mua đã đồng ý với các điều khoản và điều kiện trên</p>
                <p>- Nếu bạn có câu hỏi, xin hãy liên hệ chúng tôi</p>
                <p>- Email: support@evebox.vn</p>
                <p>Hotline: 1900.6408 (Thứ 2 - Thứ 6, 08:30 - 18:30)</p>

                <h2 style="color: #333; font-size: 18px; text-align: center;">Thông tin người mua</h2>
                ${formAnswersHtml}

                <h2 style="color: #333; font-size: 18px; text-align: center;">Chi tiết đơn hàng</h2>
                <p><strong>Phương thức thanh toán:</strong> ${data.PaymentInfo.method}</p>
                <p><strong>Thời gian đặt vé: </strong>${new Date(data.PaymentInfo.paidAt).toLocaleTimeString()}, ${new
            Date(data.PaymentInfo.paidAt).toLocaleDateString()}</p>

                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p><strong>Sản phẩm</strong> 
                      
                    </p>
                    <p>${data.ticketType.name}</p>
                    <p>${data.ticketType.price.toLocaleString()} x ${data.count}
                      <span style="float: right; font-weight: bold;">
                        ${(data.ticketType.price * data.count).toLocaleString()} VNĐ
                      </span>
                    </p>
                    <hr>
                    <p><strong>Phí giao hàng</strong> <span style="float: right;">0 VNĐ</span></p>
                    <p><strong>Phí dịch vụ</strong> <span style="float: right;">0 VNĐ</span></p>
                    <hr>
                    <p style="font-weight: bold; color: #0C4762; font-size: 18px;">Tổng tiền 
                      <span style="float: right;">
                        ${(data.ticketType.price * data.count).toLocaleString()} VNĐ
                      </span>
                    </p>
                </div>

            </div>
          </div>
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
