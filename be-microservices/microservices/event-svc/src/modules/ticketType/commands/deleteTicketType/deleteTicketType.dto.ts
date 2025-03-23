import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteTicketTypeDto {
  @ApiProperty({ example: '1', description: 'Ticket Type ID' })
  @IsString()
  id: string;
}