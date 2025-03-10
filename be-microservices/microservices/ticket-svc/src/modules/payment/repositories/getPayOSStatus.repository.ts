import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class GetPayOSStatusRepository {
  constructor(private readonly prisma: PrismaService) {}
  async updatePayOSStatus(orderCode: number, status: string){
    return await this.prisma.payOSInfo.update({
      where: {
        orderCode: orderCode
      },
      data: {
        status: status
      }
    });
  }
  async getPayOSPaymentLink(orderCode: number){
    return await this.prisma.payOSInfo.findUnique({
      where: {
        orderCode: orderCode>>0
      }
    });
  }
}