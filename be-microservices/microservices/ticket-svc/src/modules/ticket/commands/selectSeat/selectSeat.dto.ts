import { ApiProperty } from "@nestjs/swagger";
import e from "express";

class SeatInfo {
  @ApiProperty({ example: 4, description: 'Seat ID' })
  seatId: number;
}
import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';

export class SelectSeatDto {
  @ApiProperty({ example: '123122311', description: 'Showing ID' })
  showingId: string;

  @ApiProperty({ example: '12354', description: 'Ticket Type ID' })
  tickettypeId: string;

  @ApiProperty({ example: 3, description: 'Num of Ticket', required: false })
  @Transform(({ value }) => (value === undefined ? 0 : Number(value))) // Nếu undefined, gán 0
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number = 0;

  @ApiProperty({ type: [SeatInfo], description: 'Seat Information' })
  seatInfo: SeatInfo[];
}