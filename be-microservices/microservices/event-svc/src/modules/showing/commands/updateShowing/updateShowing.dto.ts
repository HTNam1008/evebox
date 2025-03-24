import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, ValidateIf } from 'class-validator';

export class UpdateShowingDto {
  @ApiProperty({ example: 'Online', description: 'Showing type' })
  @IsOptional()
  @IsString({ message: 'Showing type must be a string' })
  status: string;

  @ApiProperty({ example: '2021-08-01T00:00:00.000Z', description: 'Showing startTime' })
  @IsOptional()
  @IsDateString(undefined, { message: 'Showing startTime must be a valid ISO date string' })
  startTime: string;

  @ApiProperty({ example: '2021-08-01T00:00:00.000Z', description: 'Showing endTime' })
  @IsOptional()
  @IsDateString(undefined, { message: 'Showing endTime must be a valid ISO date string' })
  endTime: string;
}