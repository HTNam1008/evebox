import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsBoolean, IsNumber } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Tech Conference 2025', description: 'Title of the event' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A technology conference for developers', description: 'Event description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-06-01T09:00:00.000Z', description: 'Event start date' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2025-06-03T18:00:00.000Z', description: 'Event end date' })
  @IsDateString()
  endDate: Date;

  @ApiProperty({ example: '1', description: 'Organizer ID', required: false })
  @IsString()
  @IsOptional()
  organizerId?: string;

  @ApiProperty({ example: 'active', description: 'Status of the event' })
  @IsString()
  status: string;

  @ApiProperty({ example: 1, description: 'Province ID' })
  @IsNumber()
  provinceId: number;

  @ApiProperty({ example: 1, description: 'District ID' })
  @IsNumber()
  districtId: number;

  @ApiProperty({ example: "Phuong 3", description: 'Ward String' })
  @IsString()
  wardString: string;
  
  @ApiProperty({ example: "10 To Hien Thanh", description: 'Location String' })
  @IsString()
  locationString: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Array of category IDs', required: true })
  @IsNumber({}, { each: true })
  categoryIds: number[];

}

export class UpdateEventDto {
  @ApiProperty({ example: 'Updated Conference Title', description: 'Updated event title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Updated event description', description: 'Updated event description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-07-01T10:00:00.000Z', description: 'Updated event start date', required: false })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ example: '2025-07-03T20:00:00.000Z', description: 'Updated event end date', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ example: 'canceled', description: 'Updated status of the event', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  
  @ApiProperty({ example: 1, description: 'Province ID' })
  @IsNumber()
  provinceId: number;

  @ApiProperty({ example: 1, description: 'District ID' })
  @IsNumber()
  districtId: number;

  @ApiProperty({ example: "Phuong 3", description: 'Ward String' })
  @IsString()
  wardString: string;
  
  @ApiProperty({ example: "10 To Hien Thanh", description: 'Location String' })
  @IsString()
  locationString: string;

  @ApiProperty({ example: 110, description: 'Updated logo image ID', required: false })
  @IsNumber()
  @IsOptional()
  imgLogoId?: number;

  @ApiProperty({ example: 120, description: 'Updated poster image ID', required: false })
  @IsNumber()
  @IsOptional()
  imgPosterId?: number;

  @ApiProperty({ example: [1, 2, 3], description: 'Array of category IDs', required: true })
  @IsNumber({}, { each: true })
  categoryIds: number[];
}
