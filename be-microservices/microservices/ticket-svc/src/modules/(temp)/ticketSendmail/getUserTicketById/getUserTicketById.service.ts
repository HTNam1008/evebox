import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getUserTicketRepository } from './getUserTicket.repository';
import { UserTicketByIdDto } from './getUserTicketById-response.dto';
import { EmailService } from 'src/infrastructure/adapters/email/email.service';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

@Injectable()
export class GetUserTicketByIdService {
  constructor(
    private getUserTicketRepository: getUserTicketRepository,
    private readonly emailService: EmailService,
  ) {}

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
  
    if (!data.TicketQRCode || data.TicketQRCode.length === 0) {
      throw new Error('No TicketQrCode found in the ticket data.');
    }
  
    for (const ticket of data.TicketQRCode) {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];
  
      doc.text(`Ticket QR Code: ${ticket.qrCode}`, { align: 'center' });
      
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
