import { ApiProperty } from '@nestjs/swagger';

export class selectSeatResponseDto {
  @ApiProperty({ example: 200, description: 'Response status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Seat locked successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({ example: true, description: 'Available seat status'})
  data: boolean;
  
}