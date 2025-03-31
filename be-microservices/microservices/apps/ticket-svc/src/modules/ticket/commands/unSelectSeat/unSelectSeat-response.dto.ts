import { ApiProperty } from '@nestjs/swagger';

export class UnSelectSeatResponseDto {
  @ApiProperty({ example: 200, description: 'Response status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Clear Seat successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({ example: true, description: 'UnSelectSeat status'})
  data: boolean;
  
}