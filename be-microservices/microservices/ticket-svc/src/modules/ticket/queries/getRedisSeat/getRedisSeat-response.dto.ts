import { ApiProperty } from "@nestjs/swagger";

export class GetRedisSeatResponseData {
  
  @ApiProperty({ example: '16962844867169', description: 'Showing ID' })
  showingId: string;

  @ApiProperty({ example: 3, description: 'Num of Ticket', required: false })
  quantity?: number = 0;

  @ApiProperty({ example: '1027771', description: 'Ticket Type ID' })
  tickettypeId?: string;

  @ApiProperty({ example: [1, 2 ,3], description: 'Seat Information' })
  seatId: number[];

  @ApiProperty({ example: '1200', description: 'Expired Time, second unit, 1200 mean 1200s = 20m' })
  expiredTime?: number;
}

export class GetRedisSeatResponseDto {
  @ApiProperty({ example: 200, description: 'status code' })
  statusCode: number;

  @ApiProperty({ example: 'Get redis seat successfully', description: 'message' })
  message: string;

  @ApiProperty({ type: GetRedisSeatResponseData, description: 'data' })
  data: GetRedisSeatResponseData;
}