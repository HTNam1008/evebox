import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteEventDto {
  @ApiProperty({ example: 22911, description: 'Event ID' })
  @IsNumber()
  id: number;
}