import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { UpdateOrgPaymentInfoDto } from '../commands/updateOrgPaymentInfo/updateOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateOrgPaymentInfoDtoV2 } from '../commands/updateOrgPaymentInfoV2/updateOrgPaymentInfo.dto';

@Injectable()
export class UpdateOrgPaymentInfoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateOrgPaymentInfo(id: string, dto: UpdateOrgPaymentInfoDto): Promise<Result<string, Error>> {
    try {
      const existing = await this.prisma.orgPaymentInfo.findFirst({
        where: { id, isDeleted: false },
      });
      if (!existing) {
        return Err(new Error('OrgPaymentInfo not found'));
      }
      const updated = await this.prisma.orgPaymentInfo.update({
        where: { id },
        data: { ...dto },
      });
      return Ok(updated.id);
    } catch (error) {
      return Err(new Error('Failed to update OrgPaymentInfo'));
    }
  }

  async updateOrgPaymentInfoV2(id: string, dto: UpdateOrgPaymentInfoDtoV2): Promise<Result<string, Error>> {
    try {
      const existing = await this.prisma.orgPaymentInfor.findFirst({
        where: { id, isDeleted: false },
      });
      if (!existing) {
        return Err(new Error('OrgPaymentInfo not found'));
      }
      const updated = await this.prisma.orgPaymentInfor.update({
        where: { id },
        data: { ...dto },
      });
      return Ok(updated.id);
    } catch (error) {
      return Err(new Error('Failed to update OrgPaymentInfo'));
    }
  }
}