import { IsString, IsBoolean, IsInt, IsOptional, IsDate } from 'class-validator';

export class CreateTicketTypeDto {
  @IsString()
  showingId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsBoolean()
  isFree: boolean;

  @IsInt()
  price: number;

  @IsInt()
  originalPrice: number;

  @IsInt()
  maxQtyPerOrder: number;

  @IsInt()
  minQtyPerOrder: number;

  @IsDate()
  effectiveFrom: Date;

  @IsOptional()
  @IsDate()
  effectiveTo?: Date;

  @IsInt()
  position: number;

  @IsString()
  status: string;

  @IsString()
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  isHidden?: boolean;
}