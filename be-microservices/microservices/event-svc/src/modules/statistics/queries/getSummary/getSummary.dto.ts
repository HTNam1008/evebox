import { IsOptional, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SummaryQueryDto {
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  fromDate?: Date;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  toDate?: Date;
}
