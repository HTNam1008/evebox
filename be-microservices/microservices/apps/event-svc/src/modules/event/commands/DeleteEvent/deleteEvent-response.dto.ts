import { ApiProperty } from '@nestjs/swagger';

export class DeleteEventResponseDto {
  @ApiProperty({ example: 22911, description: 'Deleted Event ID' })
  id: number;
}

export class EventResponse {
  @ApiProperty({ example: 200, description: 'Status code' })
  statusCode: number;

  @ApiProperty({ example: 'Event deleted successfully', description: 'Message' })
  message: string;

  @ApiProperty({ type: DeleteEventResponseDto, description: 'Deleted event data' })
  data: DeleteEventResponseDto;
}