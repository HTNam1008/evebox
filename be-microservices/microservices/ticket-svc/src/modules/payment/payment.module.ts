import { Module } from '@nestjs/common';
import { getPaymentMethodController } from './queries/getPaymentMethod/getPaymentMethod.controller';
import { getPaymentMethodService } from './queries/getPaymentMethod/getPaymentMethod.service';
import { getPaymentMethodRepository } from './repositories/getPaymentMethod.repository';

@Module({
  controllers: 
    [
      getPaymentMethodController,
    ],
  providers: 
    [
      getPaymentMethodRepository,
      getPaymentMethodService,

      
    ],
})
export class PaymentModule {}