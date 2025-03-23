import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteShowingDto {
  @ApiProperty({ example: '1', description: 'Showing ID' })
  @IsString()
  id: string;
}