import { Module } from '@nestjs/common';
import { getPaymentMethodController } from './queries/getPaymentMethod/getPaymentMethod.controller';
import { getPaymentMethodService } from './queries/getPaymentMethod/getPaymentMethod.service';
import { getPaymentMethodRepository } from './repositories/getPaymentMethod.repository';
import { PayOSCheckoutController } from './commands/payOSCheckout/payOSCheckout.controller';
import { PayOSCheckoutService } from './commands/payOSCheckout/payOSCheckout.service';
import { payOSCheckoutRepository } from './repositories/payOSCheckout.repository';
import { GetPayOSStatusController } from './queries/getPayOSStatus/getPayOSStatus.controller';
import { GetPayOSStatusRepository } from './repositories/getPayOSStatus.repository';
import { GetPayOSStatusService } from './queries/getPayOSStatus/getPayOSStatus.service';

@Module({
  controllers: 
    [
      getPaymentMethodController,
      PayOSCheckoutController,
      GetPayOSStatusController,
    ],
  providers: 
    [
      getPaymentMethodRepository,
      getPaymentMethodService,

      PayOSCheckoutService,
      payOSCheckoutRepository,

      GetPayOSStatusService,
      GetPayOSStatusRepository,
    ],
})
export class PaymentModule {}