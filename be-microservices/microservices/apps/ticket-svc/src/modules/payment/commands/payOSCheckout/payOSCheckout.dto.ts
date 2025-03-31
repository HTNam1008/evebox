import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, Min } from "class-validator";
import { Transform } from 'class-transformer';
export class PayOSCheckoutDto {
  @ApiProperty({ example: 1, description: 'Seat ID' })
  @IsInt()
  seatId?: number[];

  @ApiProperty({ example: "16962844867169", description: 'Showing ID' })
  @IsString()
  showingId: string;

  @ApiProperty({ example: "1027771", description: 'TicketType ID' })
  @IsString()
  ticketTypeId?: string;

  @ApiProperty({ example: 2, description: 'Ticket Quantity' })
  @Transform(({ value }) => (value === undefined ? 0 : Number(value))) // Nếu undefined, gán 0
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number = 0;

  @ApiProperty({ example: "localhost:3000/payment-success", description: 'User ID' })
  @IsString()
  paymentSuccessUrl: string;

  @ApiProperty({ example: "localhost:3000/payment-cancel", description: 'User ID' })
  @IsString()
  paymentCancelUrl: string;


}