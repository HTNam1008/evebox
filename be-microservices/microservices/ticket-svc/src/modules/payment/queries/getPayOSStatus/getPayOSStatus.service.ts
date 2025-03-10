import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { GetPayOSStatusRepository } from '../../repositories/getPayOSStatus.repository';
import { PayOSService } from 'src/infrastructure/adapters/payment/payOS/payos.service';
import { PaymentLinkDataType } from '@payos/node/lib/type';
@Injectable()
export class GetPayOSStatusService {
  constructor(
    private readonly getPayOSStatusRepository: GetPayOSStatusRepository,
    private readonly payOSService: PayOSService,
  ) {}

  async execute(orderCode: number): Promise<Result<String, Error>> {
    try {
      const createdTicket = await this.getPayOSStatusRepository.createTicket(orderCode);
      if(createdTicket){
        return Ok("PAID");
      }
      else{
        return Ok("PENDING");
      }
      console.log(orderCode);
      const payOSInfo = await this.getPayOSStatusRepository.getPayOSPaymentLink(orderCode);
      if (!payOSInfo) {
        return Err(new Error('Order not found.'));
      }
      // console.log(payOSInfo);
      const paymentLinkId = payOSInfo.paymentLinkId;
      const response : PaymentLinkDataType = await this.payOSService.getPaymentLinkInformation(paymentLinkId);
      if (!response) {
        return Err(new Error('PaymentLink not found.'));
      }
      if(response.status !== "PENDING"){
        await this.getPayOSStatusRepository.updatePayOSStatus(response.orderCode, response.status);
        // return Ok(response.status);
      }
      if(response.status === "PAID"){
        await this.getPayOSStatusRepository.createTicket(response.orderCode);
      }
      return Ok(response.status);
    } catch (error) {
      console.error(error);
      return Err(new Error('Internal Server Error.'));
    }
  }

}