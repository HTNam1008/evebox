import { Module } from '@nestjs/common';
import { getPaymentMethodController } from './queries/getPaymentMethod/getPaymentMethod.controller';
import { getPaymentMethodService } from './queries/getPaymentMethod/getPaymentMethod.service';
import { getPaymentMethodRepository } from './repositories/getPaymentMethod.repository';
import { PayOSCheckoutController } from './commands/payOSCheckout/payOSCheckout.controller';
import { PayOSCheckoutService } from './commands/payOSCheckout/payOSCheckout.service';
import { payOSCheckoutRepository } from './repositories/payOSCheckout.repository';

@Module({
  controllers: 
    [
      getPaymentMethodController,
      PayOSCheckoutController,
    ],
  providers: 
    [
      getPaymentMethodRepository,
      getPaymentMethodService,

      PayOSCheckoutService,
      payOSCheckoutRepository,
    ],
})
export class PaymentModule {}