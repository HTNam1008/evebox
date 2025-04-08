import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getUserTicketRepository } from './getUserTicket.repository';
import { UserTicketByIdDto } from './getUserTicketById-response.dto';
import { EmailService } from 'src/infrastructure/adapters/email/email.service';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';
import * as path from 'path';
import { format } from 'date-fns';
import axios from 'axios';

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
        //"a2765e1b-7e31-43dc-9f85-b69236ffcd12"
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
  
    // A4 dimensions
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 40; // Small margin on each side
    const contentWidth = pageWidth - (margin * 2);

    // Get the event image if available
  let eventImageBuffer: Buffer | null = null;
  const imageUrl = data.Showing?.Events.Images_Events_imgPosterIdToImages?.imageUrl;
  
  if (imageUrl) {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      eventImageBuffer = Buffer.from(response.data, 'binary');
    } catch (error) {
      console.error('Failed to fetch event image:', error);
    }
  }
  
    for (const ticket of data.TicketQRCode) {
      const doc = new PDFDocument({ size: [pageWidth, pageHeight], margin: 0 }); // A4 size
      const buffers: Buffer[] = [];
      
      doc.registerFont('Roboto', fontPath);
      doc.font('Roboto');
  
      const seat = data.seats.find(s => s.id === ticket.seatId);
      
      doc.rect(0, 0, pageWidth, pageHeight).fill('#ffffff');
      
      // Event title
      doc.fontSize(18).fillColor('#007074');
      doc.text(`${data.Showing?.Events.title.toUpperCase() || '-'}`, 0, 60, { align: 'center', width: pageWidth });

      // Event image section - with margins
    const imageHeight = 200;
    const imageY = 120;
    
    // Draw a container for the image with margins
    doc.roundedRect(margin, imageY, contentWidth, imageHeight, 10).stroke('#dddddd');
    
    // Add event image if available, otherwise use green background
    if (eventImageBuffer) {
      try {
        // Fill the entire container with the image (no empty spaces on sides)
        doc.save(); // Save the current graphics state
        
        // Create a clipping path in the shape of the rounded rectangle
        doc.roundedRect(margin, imageY, contentWidth, imageHeight, 10).clip();
        
        // Get image dimensions to calculate proper scaling
        const img = doc.openImage(eventImageBuffer);
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        // Calculate scaling to fill the container completely
        const containerRatio = contentWidth / imageHeight;
        const imageRatio = imgWidth / imgHeight;
        
        let scaledWidth, scaledHeight, offsetX, offsetY;
        
        if (imageRatio > containerRatio) {
          // Image is wider than container (relative to height)
          scaledHeight = imageHeight;
          scaledWidth = scaledHeight * imageRatio;
          offsetX = margin - ((scaledWidth - contentWidth) / 2);
          offsetY = imageY;
        } else {
          // Image is taller than container (relative to width)
          scaledWidth = contentWidth;
          scaledHeight = scaledWidth / imageRatio;
          offsetX = margin;
          offsetY = imageY - ((scaledHeight - imageHeight) / 2);
        }
        
        // Draw the image to fill the container
        doc.image(eventImageBuffer, offsetX, offsetY, { 
          width: scaledWidth,
          height: scaledHeight
        });
        
        doc.restore(); // Restore the graphics state
      } catch (error) {
        console.error('Failed to add event image to PDF:', error);
        // Fallback to green background if image fails
        doc.roundedRect(margin, imageY, contentWidth, imageHeight, 10).fill('#007074');
      }
    } else {
      // Fallback to green background if no image
      doc.roundedRect(margin, imageY, contentWidth, imageHeight, 10).fill('#007074');
    }
    
      
      // Check if QR code is valid (not "Unknown")
    const hasValidQRCode = ticket.qrCode && ticket.qrCode !== "Unknow";
    
    // QR Code and ticket info section - with margins
    doc.rect(margin, 340, contentWidth, 200).stroke('#dddddd');
    
    // QR Code - only if valid
    if (hasValidQRCode) {
      // If QR code is a base64 image
      if (ticket.qrCode.startsWith('data:image')) {
        const base64Image = ticket.qrCode.replace(/^data:image\/png;base64,/, '');
        const imageBuffer = Buffer.from(base64Image, 'base64');
        doc.image(imageBuffer, margin + 20, 360, { width: 150, height: 150 });
      } else {
        // If QR code is a string, generate a QR code (or use a placeholder)
        doc.rect(margin + 20, 360, 150, 150).stroke();
        doc.fontSize(10).text('QR Code:', margin + 20, 380, { width: 150, align: 'center' });
        doc.fontSize(8).text(ticket.qrCode, margin + 20, 400, { width: 150, align: 'center' });
      }
    }
    
    // Ticket information section - positioned based on whether there's a QR code
    const infoX = hasValidQRCode ? margin + 200 : margin + 20;
    const infoWidth = hasValidQRCode ? contentWidth - 220 : contentWidth - 40;
    
    // Get seat information for this specific ticket
    const rowName = seat?.Row?.name || '-';
    const seatName = seat?.name || '-';
    const sectionName = seat?.Row?.Section?.name || '-';
    
    // Ticket details
    doc.fontSize(10).fillColor('#666666');
    doc.text('Mã đơn:', infoX, 370);
    doc.fontSize(10).fillColor('#000000');
    doc.text(data.id || '2037583450', infoX + 70, 370);
    
    doc.fontSize(10).fillColor('#666666');
    doc.text('Loại vé:', infoX, 390);
    doc.fontSize(10).fillColor('#000000');
    doc.text(data.ticketType?.name || '-', infoX + 70, 390, { width: infoWidth - 80 });
    
    doc.fontSize(10).fillColor('#666666');
    doc.text('Khu vực:', infoX, 410);
    doc.fontSize(10).fillColor('#000000');
    doc.text(sectionName || 'LIGHTSTICK (-2%)', infoX + 70, 410, { width: infoWidth - 80 });
    
    doc.fontSize(10).fillColor('#666666');
    doc.text('Hàng:', infoX, 430);
    doc.fontSize(10).fillColor('#000000');
    doc.text(rowName || '-', infoX + 70, 430);
    
    doc.fontSize(10).fillColor('#666666');
    doc.text('Ghế:', infoX, 450);
    doc.fontSize(10).fillColor('#000000');
    doc.text(seatName || '-', infoX + 70, 450);
    
    doc.fontSize(10).fillColor('#666666');
    doc.text('Số thứ tự:', infoX, 470);
    doc.fontSize(10).fillColor('#000000');
    doc.text(ticket.ticketTypeId || '1033365', infoX + 70, 470);
    
    // Venue and time information - with margins
    doc.rect(margin, 550, contentWidth, 100).stroke('#dddddd');
    
    // Location icon
    doc.fontSize(12).fillColor('#007074');
    doc.text('Địa điểm:', margin + 10, 560);
    
    // Venue information
    doc.fontSize(12).fillColor('#000000');
    doc.text(data.Showing?.Events.venue || '-', margin + 70, 560);
    doc.fontSize(10).fillColor('#666666');
    doc.text(data.Showing?.Events.locationsString || '-', margin + 70, 580, { width: contentWidth - 40 });
    
    // Time icon
    doc.fontSize(12).fillColor('#007074');
    doc.text('Thời gian:', margin + 10, 610);
    
    // Format date and time
    const eventDate = data.Showing?.startTime 
      ? new Date(data.Showing.startTime)
      : new Date();
    
    const endTime = data.Showing?.endTime
      ? new Date(data.Showing.endTime)
      : new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours later
    
    const formattedStartTime = eventDate.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const formattedEndTime = endTime.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const formattedDate = format(eventDate, 'dd/MM/yyyy');
    
    // Time information
    doc.fontSize(12).fillColor('#000000');
    doc.text(`${formattedStartTime} - ${formattedEndTime}, ${formattedDate}`, margin + 70, 610);
    
    // Issue date
    const currentDate = new Date();
    const formattedIssueDate = format(currentDate, 'dd/MM/yyyy');
    
    doc.fontSize(10).fillColor('#666666');
    doc.text(`Được tạo bởi Evebox vào ${formattedIssueDate}`, margin, 670, { align: 'center', width: contentWidth });
    
    // Terms and conditions
    doc.fontSize(14).fillColor('#000000');
    doc.text('Điều khoản và Điều kiện:', margin, 700);
    
    doc.fontSize(10).fillColor('#666666');
    doc.text('• Vé này chỉ dành cho 1 người vào cửa.', margin, 720);
    doc.text('• Không hoàn tiền cho vé đã thanh toán.', margin, 735);
    doc.text('• Người mua phải trình vé để có thể tham gia sự kiện.', margin, 750);
    doc.text('• Người mua chịu trách nhiệm bảo mật thông tin vé của mình.', margin, 765);
    doc.text('• Khi mua vé, tức là người mua đã đồng ý với các điều khoản và điều kiện được ghi rõ tại evebox.vn', margin, 780, { width: contentWidth });

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
