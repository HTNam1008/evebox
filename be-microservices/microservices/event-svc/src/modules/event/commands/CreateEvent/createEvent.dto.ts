import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsDateString, IsBoolean, IsNumber, IsIn } from 'class-validator';
import { isDeepStrictEqual } from 'util';


export class CreateEventDto {
  @ApiProperty({ example: 'Tech Conference 2025', description: 'Title of the event' })
  @IsString({message: 'Title must be a string'})
  title: string;

  @ApiProperty({ example: 'A technology conference for developers', description: 'Event description', required: false })
  @IsString({message: 'Description must be a string'})
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1, description: 'District ID' })
  @IsNumber()
  districtId: number;

  @ApiProperty({ example: "Phuong 3", description: 'Ward String' })
  @IsString()
  wardString: string;
  
  @ApiProperty({ example: "10 To Hien Thanh", description: 'Location String' })
  @IsString()
  streetString: string;

  @ApiProperty({ example: "San khau Thien Dang", description: 'Venue String' })
  @IsString()
  venue: string;

  @ApiProperty({ example: 'Nha hat kich Sai Gon', description: 'Organizer Name' })
  @IsString()
  orgName: string;

  @ApiProperty({ example: 'Thanh lap nam 2010', description: 'Organizer Description' })
  @IsString()
  orgDescription: string;

  @ApiProperty({ example: [1, 2], description: 'Array of category IDs', required: true })
  @IsNumber({}, { each: true })
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  @IsIn ([1, 2, 3, 4])
  categoryIds: number[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Img Logo File',
    example: 'logo.png'
  })
  imgLogo: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Img Poster File',
    example: 'poster.png'
  })
  imgPoster: Express.Multer.File;

}