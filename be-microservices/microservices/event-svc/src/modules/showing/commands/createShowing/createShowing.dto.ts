import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsDateString, IsBoolean, IsNumber, IsIn, ValidateIf } from 'class-validator';
import { isDeepStrictEqual } from 'util';


export class CreateShowingDto {

  @ApiProperty({ example: '2021-08-01T00:00:00.000Z', description: 'Showing startTime' })
  @IsDateString(undefined, {message: 'Showing date must be a string'})
  startTime: string;

  @ApiProperty({ example: '2021-08-01T00:00:00.000Z', description: 'Showing endTime' })
  @IsDateString(undefined, {message: 'Showing date must be a string'})
  @ValidateIf((o) => new Date(o.endTime) > new Date(o.startTime), {message: 'End time must be greater than start time'})
  endTime: string;
}