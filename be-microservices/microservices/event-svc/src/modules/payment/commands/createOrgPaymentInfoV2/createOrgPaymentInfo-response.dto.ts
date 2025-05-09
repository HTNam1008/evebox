import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/constants/baseResponse';

export class CreateOrgPaymentInfoResponseDtoV2 extends BaseResponse {
  @ApiProperty({ example: 'd1f6f89e-5b77-4e57-9f1a-123456789abc', description: 'Created OrgPaymentInfo id' })
  data: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    organizerId: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    businessType: number;
    fullName: string;
    address: string;
    taxCode: string;
  }
}
