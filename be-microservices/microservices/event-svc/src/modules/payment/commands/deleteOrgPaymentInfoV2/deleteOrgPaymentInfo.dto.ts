import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteOrgPaymentInfoDtoV2 {
  @ApiProperty({ example: 'd1f6f89e-5b77-4e57-9f1a-123456789abc', description: 'OrgPaymentInfo ID to delete' })
  @IsString()
  id: string;
}