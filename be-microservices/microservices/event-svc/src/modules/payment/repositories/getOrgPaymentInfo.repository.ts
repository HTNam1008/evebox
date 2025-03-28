import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class GetOrgPaymentInfoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrgPaymentInfoByOrganizer(organizerId: string): Promise<any> {
    return this.prisma.orgPaymentInfo.findFirst({
      where: {
        organizerId: organizerId,
        isDeleted: false,
      },
    });
  }
}