import { ApiProperty } from '@nestjs/swagger';

export class PayOSCheckoutResponseData {

  @ApiProperty({
    example: "https://pay.payos.vn/web/1d351350849f4af295232eeb39d2fdd8",
    description: 'Payment Link',
  })
  paymentLink: string;

  
  @ApiProperty({
    example: "10001",
    description: 'Payment Order Code',
  })
  orderCode: number;
}

export class PayOSCheckoutResponseDto {
  @ApiProperty({ example: 200, description: 'Response status code' })
  statusCode: number;

  @ApiProperty({
    example: 'PayOS checkout successfully',
    description: 'Response message',
  })
  message: string;
  
  @ApiProperty({ type: PayOSCheckoutResponseData, description: 'Response data' })
  data: PayOSCheckoutResponseData;
}
