import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteFormDto {
  @ApiProperty({ example: 1, description: 'Form ID to delete' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'organizer123@gmail.com', description: 'Organizer email (creator of the form)' })
  @IsString()
  createdBy: string;
}
