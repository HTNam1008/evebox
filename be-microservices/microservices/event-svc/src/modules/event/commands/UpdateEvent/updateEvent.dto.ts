import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class UpdateEventDto {
  @ApiPropertyOptional({ example: 'Tech Conference 2025', description: 'Title of the event' })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @ApiPropertyOptional({ example: 'A technology conference for developers', description: 'Event description' })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiPropertyOptional({ example: 1, description: 'District ID' })
  @IsOptional()
  @IsNumber()
  districtId?: number;

  @ApiPropertyOptional({ example: 'Phuong 3', description: 'Ward String' })
  @IsOptional()
  @IsString()
  wardString?: string;

  @ApiPropertyOptional({ example: '10 To Hien Thanh', description: 'Location String' })
  @IsOptional()
  @IsString()
  streetString?: string;

  @ApiPropertyOptional({ example: 'San khau Thien Dang', description: 'Venue String' })
  @IsOptional()
  @IsString()
  venue?: string;

  @ApiPropertyOptional({ example: 'Nha hat kich Sai Gon', description: 'Organizer Name' })
  @IsOptional()
  @IsString()
  orgName?: string;

  @ApiPropertyOptional({ example: 'Thanh lap nam 2010', description: 'Organizer Description' })
  @IsOptional()
  @IsString()
  orgDescription?: string;

  @ApiPropertyOptional({ example: [1, 2], description: 'Array of category IDs' })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  @IsIn([1, 2, 3, 4], { each: true })
  categoryIds?: number[];

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Img Logo File',
    example: 'logo.png'
  })
  imgLogo?: Express.Multer.File;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Img Poster File',
    example: 'poster.png'
  })
  imgPoster?: Express.Multer.File;
}