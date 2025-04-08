import { ApiHeader, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteFormDto {
  @ApiProperty({ example: 1, description: 'Form ID to delete' })
  @IsNumber()
  id: number;
}
