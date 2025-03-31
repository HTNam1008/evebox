import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { DeleteOrgPaymentInfoDto } from '../commands/deleteOrgPaymentInfo/deleteOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class DeleteOrgPaymentInfoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteOrgPaymentInfo(dto: DeleteOrgPaymentInfoDto): Promise<Result<string, Error>> {
    try {
      const existing = await this.prisma.orgPaymentInfo.findFirst({
        where: { id: dto.id, isDeleted: false },
      });
      if (!existing) {
        return Err(new Error('OrgPaymentInfo not found'));
      }
      const deleted = await this.prisma.orgPaymentInfo.update({
        where: { id: dto.id },
        data: { isDeleted: true },
      });
      return Ok(deleted.id);
    } catch (error) {
      return Err(new Error('Failed to delete OrgPaymentInfo'));
    }
  }
}