import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getUserTicketRepository } from './getUserTicket.repository';
import { UserTicketByIdDto } from './getUserTicketById-response.dto';
import { EmailService } from 'src/infrastructure/adapters/email/email.service';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';
import * as path from 'path';

@Injectable()
export class GetUserTicketByIdService {
  constructor(
    private getUserTicketRepository: getUserTicketRepository,
    private readonly emailService: EmailService,
  ) { }

  async execute(): Promise<Result<UserTicketByIdDto, Error>> {
    try {
      const userTickets = await this.getUserTicketRepository.getUserTicketById(
        "dattruong01082@gmail.com",
        "571fb99f-6754-4621-b728-63f01f77945b"
      );

      if (!userTickets) {
        return Err(new Error('User ticket not found.'));
      }

      // Tạo nhiều file PDF tương ứng với TicketQrCode
      const pdfBuffers = await this.genPdfTicket(userTickets);
      if (!pdfBuffers.length) {
        return Err(new Error('Failed to generate PDFs.'));
      }

      // Gửi email với các file PDF đính kèm
      const attachments = pdfBuffers.map((buffer, index) => ({
        name: `ticket_${index + 1}.pdf`,
        content: buffer.buffer,
        type: 'application/pdf',
      }));

      await this.emailService.sendTicketEmail(userTickets, attachments);

      return Ok(userTickets);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to process ticket retrieval and email.'));
    }
  }



  async genPdfTicket(data: UserTicketByIdDto): Promise<{ filename: string; buffer: Buffer }[]> {
    const pdfFiles: { filename: string; buffer: Buffer }[] = [];
    const fontPath = path.resolve(__dirname, '../../../../assets/fonts/Roboto.ttf');
    if (!data.TicketQRCode || data.TicketQRCode.length === 0) {
      throw new Error('No TicketQrCode found in the ticket data.');
    }

    for (const ticket of data.TicketQRCode) {
      const doc = new PDFDocument({ margin: 50 }); // Thêm margin để tránh chữ bị chồng chéo
      const buffers: Buffer[] = [];

      // Đăng ký font Roboto
      doc.registerFont('Roboto', fontPath);
      doc.font('Roboto');

      // Tiêu đề vé
      doc.fillColor('#0C4762')
        .fontSize(22)
        .text(data.Showing?.Events.title.toUpperCase(), { align: 'center' });
      doc.moveDown(1.5);

      doc.fillColor('#1AA768')
        .fontSize(14)
        .text('CHÚC MỪNG BẠN ĐÃ MUA VÉ THÀNH CÔNG!', { align: 'center' });
      doc.moveDown();

      // Đường kẻ phân cách
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1.5);

      // Thông tin sự kiện
      doc.fillColor('#0C4762')
        .fontSize(14)
        .text('THÔNG TIN SỰ KIỆN', { underline: true });
      doc.moveDown();
      doc.fillColor('black').fontSize(12).font('Roboto');
      doc.text(`Ngày: ${data.Showing?.startTime.toLocaleDateString('vi-VN')}`);
      doc.text(`Giờ: ${data.Showing?.startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`);
      doc.text(`Địa điểm: ${data.Showing?.Events.venue}`);
      doc.moveDown(1.5);

      // Thông tin vé
      doc.fillColor('#0C4762')
        .fontSize(14)
        .text('THÔNG TIN VÉ', { underline: true });
      doc.moveDown();

      const validSeats = data.seats.filter(seat => seat && seat.Row?.name && seat.name);

      if (validSeats.length > 0) {
        // Hiển thị Hàng ghế và Số ghế nếu có ghế hợp lệ
        doc.fillColor('black').fontSize(12).font('Roboto');

        const rowNames = validSeats.map(seat => seat.Row.name).join(', ');
        const seatNames = validSeats.map(seat => seat.name).join(', ');

        doc.text(`Hàng ghế: ${rowNames}`);
        doc.text(`Số ghế: ${seatNames}`);
        doc.moveDown(2);
      }
      // Mã QR
      if (ticket.qrCode) {
        const base64Image = ticket.qrCode.replace(/^data:image\/png;base64,/, '');
        const imageBuffer = Buffer.from(base64Image, 'base64');

        const qrX = 50; // Vị trí bắt đầu của QR Code
        const termsX = 250; // Dịch sang phải để Điều khoản ngang hàng

        // Hiển thị QR Code
        doc.image(imageBuffer, qrX, doc.y, { width: 150, height: 150 });

        // Cố định vị trí `y` để điều khoản ngang hàng với QR Code
        const qrY = doc.y;

        // Đặt con trỏ `x` sang phải để ghi Điều khoản
        doc.x = termsX;
        doc.y = qrY;

        // Điều khoản sử dụng
        doc.fillColor('#0C4762').fontSize(12).text('Điều khoản & điều kiện:', { underline: true });
        doc.fillColor('black').fontSize(10).font('Roboto');
        doc.text('- Vé chỉ dành cho 1 người.');
        doc.text('- Không hoàn tiền sau khi mua.');
        doc.text('- Người mua chịu trách nhiệm bảo mật thông tin.');
        doc.moveDown(2);

        // Thông tin liên hệ
        doc.fillColor('black').fontSize(10).font('Roboto');
        doc.text('Liên hệ hỗ trợ: support@evebox.vn');

        doc.moveDown(2);
      }

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        pdfFiles.push({
          filename: `ticket_${ticket.qrCode}.pdf`,
          buffer: pdfBuffer,
        });
      });
      doc.end();
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(pdfFiles), 500); // Ensure all PDFs are processed
    });
  }

}
