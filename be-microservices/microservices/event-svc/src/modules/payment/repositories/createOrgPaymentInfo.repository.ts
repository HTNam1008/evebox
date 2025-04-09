import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { CreateOrgPaymentInfoDto } from '../commands/createOrgPaymentInfo/createOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class CreateOrgPaymentInfoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrgPaymentInfo(dto: CreateOrgPaymentInfoDto, organizerId: string): Promise<Result<string, Error>> {
    try {
      const orgPayment = await this.prisma.orgPaymentInfo.create({
        data: {
          eventId: dto.eventId,
          organizerId: organizerId,
          accountName: dto.accountName,
          accountNumber: dto.accountNumber,
          bankName: dto.bankName,
          branch: dto.branch,
          businessType: dto.businessType,
          fullName: dto.fullName,
          address: dto.address,
          taxCode: dto.taxCode,
        },
      });
      if (!orgPayment) {
        return Err(new Error('Failed to create OrgPaymentInfo'));
      }
      return Ok(orgPayment.id);
    } catch (error) {
      return Err(new Error('Failed to create OrgPaymentInfo'));
    }
  }
}