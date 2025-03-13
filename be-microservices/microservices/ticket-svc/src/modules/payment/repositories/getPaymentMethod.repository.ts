import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class getPaymentMethodRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getAllPaymentMethod(){
    return await this.prisma.paymentMethodStatus.findMany();
  }
}