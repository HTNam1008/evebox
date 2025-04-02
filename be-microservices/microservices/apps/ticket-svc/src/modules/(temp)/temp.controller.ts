// import { Controller, Get, Post, Delete, Body, Param, HttpStatus, Res } from '@nestjs/common';
// import PayOS from "@payos/node";
// import { PayOSService } from 'src/infrastructure/adapters/payment/payOS/payos.service';

// interface CheckoutRequestType {
//   orderCode: number;
//   amount: number;
//   description: string;
//   cancelUrl: string;
//   returnUrl: string;
//   signature?: string;
// }

// interface CheckoutResponseDataType {
//   bin: string;
//   accountNumber: string;
//   accountName: string;
//   amount: number;
//   description: string;
//   orderCode: number;
//   currency: string;
//   paymentLinkId: string;
//   status: string;
//   checkoutUrl: string;
//   qrCode: string;
// }

// @Controller('api/temp')
// export class TempController {
//   // private payOS: PayOS;

//   constructor(private readonly payOS: PayOSService) {
    
//   }

//   @Get()
//   async findAll(@Res() res) {
//     return res.status(HttpStatus.OK).json({ message: 'Hello World!' });
//   }

//   // 1️⃣ Tạo link thanh toán
//   @Post('/payos/checkout')
//   async createPaymentLink(@Body() body: CheckoutRequestType, @Res() res) {
//     try {
//       const response: CheckoutResponseDataType = await this.payOS.createPaymentLink({
//         orderCode: Date.now(),
//         amount: 2000,
//         description: "Thanh toán đơn hàng",
//         cancelUrl: "https://example.com/cancel",
//         returnUrl: "https://example.com/success",
//         expiredAt: Math.floor(Date.now() / 1000) + 3 * 60,
//       });
//       return res.status(HttpStatus.CREATED).json(response);
//     } catch (error) {
//       console.error("Lỗi khi tạo link thanh toán:", error);
//       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Không thể tạo link thanh toán" });
//     }
//   }

//   // 2️⃣ Lấy thông tin thanh toán của đơn hàng
//   @Get('/payos/payment-link/:id')
//   async getPaymentLinkInformation(@Param('id') id: string, @Res() res) {
//     try {
//       const response = await this.payOS.getPaymentLinkInformation(id);
//       return res.status(HttpStatus.OK).json(response);
//     } catch (error) {
//       console.error("Lỗi khi lấy thông tin thanh toán:", error);
//       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Không thể lấy thông tin thanh toán" });
//     }
//   }

//   // 3️⃣ Hủy link thanh toán
//   @Delete('/payos/payment-link/:id')
//   async cancelPaymentLink(@Param('id') id: string, @Body() body, @Res() res) {
//     try {
//       const response = await this.payOS.cancelPaymentLink(id, body.cancellationReason || "Hủy đơn hàng");
//       return res.status(HttpStatus.OK).json(response);
//     } catch (error) {
//       console.error("Lỗi khi hủy link thanh toán:", error);
//       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Không thể hủy link thanh toán" });
//     }
//   }
// }
