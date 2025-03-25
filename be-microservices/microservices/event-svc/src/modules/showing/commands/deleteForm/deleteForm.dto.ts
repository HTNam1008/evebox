import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteFormDto {
  @ApiProperty({ example: 1, description: 'Form ID cần xoá' })
  @IsNumber()
  id: number;
}