import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsDateString, IsBoolean, IsNumber, ValidateIf } from 'class-validator';

export class UpdateTicketTypeDto {
  @ApiProperty({ example: '1', description: 'Ticket Type ID' })
  @IsString()
  id: string;

  @ApiPropertyOptional({ example: 'vip', description: 'Ticket type' })
  @IsOptional()
  @IsString({ message: 'Ticket type must be a string' })
  name?: string;

  @ApiPropertyOptional({ example: 'Tang kem bap nuoc', description: 'Ticket description' })
  @IsOptional()
  @IsString({ message: 'Ticket description must be a string' })
  description?: string;

  @ApiPropertyOptional({ example: "#000000", description: 'Ticket color' })
  @IsOptional()
  @IsString({ message: 'Ticket color must be a string' })
  color?: string;

  @ApiPropertyOptional({ example: true, description: 'Ticket is Free' })
  @IsOptional()
  @IsBoolean({ message: 'Ticket is Free must be a boolean' })
  isFree?: boolean;

  @ApiPropertyOptional({ example: 100000, description: 'Ticket price' })
  @IsOptional()
  @IsNumber({}, { message: 'Ticket price must be a number' })
  originalPrice?: number;

  @ApiPropertyOptional({ example: '2024-08-01T00:00:00.000Z', description: 'Ticket startTime' })
  @IsOptional()
  @IsDateString(undefined, { message: 'Ticket startTime must be a valid ISO date string' })
  startTime?: string;

  @ApiPropertyOptional({ example: '2024-08-01T00:00:00.000Z', description: 'Ticket endTime' })
  @IsOptional()
  @IsDateString(undefined, { message: 'Ticket endTime must be a valid ISO date string' })
  @ValidateIf((o) => o.startTime && o.endTime, { message: 'End time must be greater than start time' })
  endTime?: string;

  @ApiPropertyOptional({ example: 1, description: 'Ticket Position' })
  @IsOptional()
  @IsNumber({}, { message: 'Ticket position must be a number' })
  position?: number;

  @ApiPropertyOptional({ example: 50, description: 'Ticket Quantity' })
  @IsOptional()
  @IsNumber({}, { message: 'Ticket quantity must be a number' })
  quantity?: number;

  @ApiPropertyOptional({ example: 8, description: 'Max ticket per order' })
  @IsOptional()
  @IsNumber({}, { message: 'Max ticket per order must be a number' })
  maxQtyPerOrder?: number;

  @ApiPropertyOptional({ example: 1, description: 'Min ticket per order' })
  @IsOptional()
  @IsNumber({}, { message: 'Min ticket per order must be a number' })
  minQtyPerOrder?: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Img Ticket File',
    example: 'logo.png'
  })
  img?: Express.Multer.File;

  @ApiPropertyOptional({ example: false, description: 'Ticket is active' })
  @IsOptional()
  @IsBoolean({ message: 'Ticket is active must be a boolean' })
  isHidden?: boolean;
}