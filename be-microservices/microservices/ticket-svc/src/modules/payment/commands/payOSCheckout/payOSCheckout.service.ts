import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { payOSCheckoutRepository } from '../../repositories/payOSCheckout.repository';
import { PayOSService } from 'src/infrastructure/adapters/payment/payOS/payos.service';
import { PayOSCheckoutDto } from './payOSCheckout.dto';
import { IORedisService } from 'src/infrastructure/redis/ioredis.service';
import { PayOSCheckoutResponseData } from './payOSCheckout-response.dto';

@Injectable()
export class PayOSCheckoutService {
  constructor(
    private readonly payOSCheckoutRepository: payOSCheckoutRepository,
    private readonly payOSService: PayOSService,
    private readonly ioRedisService: IORedisService,
  ) {}

  async execute(payOSCheckoutDto: PayOSCheckoutDto, userId: string): Promise<Result<PayOSCheckoutResponseData, Error>> {
    try {
      const ttl = await this.getTimeRemaining(payOSCheckoutDto, userId);
      if (ttl === 0) {
        return Err(new Error('Time remaining has expired'));
      }

      const orderCode = await this.payOSCheckoutRepository.getPayOSOrderCode();
      const amount = await this.payOSCheckoutRepository.getAmount(payOSCheckoutDto);
      if (amount === 0) {
        return Err(new Error('Invalid seat or ticket type'));
      }
      const payOSCheckout = await this.payOSService.createPaymentLink(
        {
          orderCode,
          amount: amount,
          description: "Evebox"+ " - " + Date.now(),
          cancelUrl: payOSCheckoutDto.paymentCancelUrl,
          returnUrl: payOSCheckoutDto.paymentSuccessUrl,
        }
      );
      const payOSInfoCreated = await this.payOSCheckoutRepository.checkout(payOSCheckout, userId, payOSCheckoutDto);
      if (payOSInfoCreated.isErr()) {
        return Err(new Error('Database Error.'));
      }
      
      return Ok({
        paymentLink: payOSCheckout.checkoutUrl,
        orderCode: orderCode,
      });

    } catch (error) {
      console.error(error);
      return Err(new Error('PaymentMethod not available.'));
    }
  }

  async getTimeRemaining(payOSCheckoutDto: PayOSCheckoutDto, userId: string) {
    try {
      const redis = this.ioRedisService.getClient();
      
      // Kiểm tra loại giữ ghế: giữ theo số lượng ghế (`quantity`) hoặc ghế cụ thể
      if (payOSCheckoutDto.seatId.length === 0) {
        const key = `ticket:${payOSCheckoutDto.showingId}:${payOSCheckoutDto.ticketTypeId}:${userId}`;
        const ttl = await redis.ttl(key); // Lấy thời gian còn lại
        return ttl;
      } else {  
        for (const seat of payOSCheckoutDto.seatId) {
          const seatKey = `seat:${payOSCheckoutDto.showingId}:${seat}`;
          const ttl = await redis.ttl(seatKey);
          return ttl;
        }
      }
    } catch (error) {
      console.error(error);
      return Err(new Error("Failed to get time remaining"));
    }
  }


}