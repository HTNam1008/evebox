import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/constants/baseResponse';

export class ShowingTimeResponseDto {
  @ApiProperty({ example: '1041811243642', description: 'Showing time ID' })
  id: string;

  @ApiProperty({ example: '2024-12-28T13:00:00.000Z', description: 'Start time of the showing in ISO format' })
  startTime: Date;

  @ApiProperty({ example: '2024-12-28T15:00:00.000Z', description: 'End time of the showing in ISO format' })
  endTime: Date;
}

export class GetAllShowingTimeOfEventResponseDto extends BaseResponse {
  @ApiProperty({ type: [ShowingTimeResponseDto], description: 'List of showing times' })
  data: ShowingTimeResponseDto[];
}