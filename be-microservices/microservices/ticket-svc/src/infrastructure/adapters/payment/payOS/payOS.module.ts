import { Global, Module } from '@nestjs/common';
import { PayOSService } from './payos.service';

@Global()
@Module({
  providers: [PayOSService],
  exports: [PayOSService],
})
export class PayOSModule {}
