import { ApiProperty } from '@nestjs/swagger';

export enum PaymentMethod {
  PAYOS = 'PAYOS',
}

export class getPaymentMethodResponseData {
  @ApiProperty({
    example: PaymentMethod.PAYOS,
    description: 'Payment method name',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    example: 'true',
    description: 'Is payment method enabled',
  })
  status: boolean;
}

export class getPaymentMethodResponseDto {
  @ApiProperty({ example: 200, description: 'Response status code' })
  statusCode: number;

  @ApiProperty({
    example: 'PaymentMethod data retrieved successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({ type: getPaymentMethodResponseData, description: 'Payment Method'})
  paymentMethod: getPaymentMethodResponseData[];
}