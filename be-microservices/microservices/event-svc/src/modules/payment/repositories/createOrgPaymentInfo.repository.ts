import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { CreateOrgPaymentInfoDto } from '../commands/createOrgPaymentInfo/createOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';
import { CreateOrgPaymentInfoDtoV2 } from '../commands/createOrgPaymentInfoV2/createOrgPaymentInfo.dto';
import { OrgPaymentInfor } from '@prisma/client';

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

  async findByOrganizerId(organizerId: string): Promise<OrgPaymentInfor | null> {
    return this.prisma.orgPaymentInfor.findFirst({
      where: {
        organizerId,
        isDeleted: false,
      },
    });
  }

  async createOrgPaymentInfoCopy(
    dto: CreateOrgPaymentInfoDtoV2,
    organizerId: string
  ): Promise<Result<string, Error>> {
    try {
      const orgPayment = await this.prisma.orgPaymentInfor.create({
        data: {
          organizerId,
          accountName: dto.accountName,
          accountNumber: dto.accountNumber,
          bankName: dto.bankName,
          branch: dto.branch,
          businessType: Number(dto.businessType), 
          fullName: dto.fullName || undefined,
          address: dto.address || undefined,
          taxCode: dto.taxCode || undefined,
          isDeleted: false,
        },
      });
  
      if (!orgPayment) {
        return Err(new Error("Failed to create OrgPaymentInfor"));
      }
  
      return Ok(orgPayment.id);
    } catch (error) {
      return Err(new Error("Failed to create OrgPaymentInfor"));
    }
  }
}