import { ApiProperty } from '@nestjs/swagger';

export class GetPayOSStatusResponseDto {
  @ApiProperty({ example: 200, description: 'Response status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Payos status data retrieved successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({ example: "PAID", description: 'Payment status' })
  status: string;
}