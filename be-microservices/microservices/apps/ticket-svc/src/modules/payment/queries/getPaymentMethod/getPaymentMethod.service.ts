import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getPaymentMethodRepository } from '../../repositories/getPaymentMethod.repository';
import { getPaymentMethodResponseData } from './getPaymentMethod-response.dto';
import { PaymentMethod } from './getPaymentMethod-response.dto';
@Injectable()
export class getPaymentMethodService {
  constructor(private readonly getPaymentMethodRepository: getPaymentMethodRepository) {}

  async execute(): Promise<Result<getPaymentMethodResponseData[], Error>> {
    try {
      const showing = await this.getPaymentMethodRepository.getAllPaymentMethod();
      if (!showing) {
        return Err(new Error('PaymentMethod not found.'));
      }
  
      // 🛠 Chuyển đổi paymentMethod từ string sang enum
      const formattedShowing = showing.map((item) => ({
        paymentMethod: item.paymentMethod as PaymentMethod, // Cast thành enum
        status: item.status,
      }));
  
      return Ok(formattedShowing);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch PaymentMethod data.'));
    }
  }

}