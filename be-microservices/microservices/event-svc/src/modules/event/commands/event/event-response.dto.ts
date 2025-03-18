import { ApiProperty } from "@nestjs/swagger";
import { ImagesResponseDto } from "src/modules/images/commands/images/images-response.dto";

export class EventDto {
  @ApiProperty({ example: 22911, description: 'Event ID' })
  id: number;

  @ApiProperty({
    example: 'SÂN KHẤU / ĐOÀN CẢI LƯƠNG THIÊN LONG - CAO QUÂN BẢO ĐẠI CHIẾN DƯ HỒNG (LƯU KIM ĐÍNH)',
    description: 'Event title',
  })
  title: string;

  @ApiProperty({
    example: '2024-12-28T13:00:00.000Z',
    description: 'Event start date in ISO format',
  })
  startDate: string;

  @ApiProperty({ example: 'select_showing', description: 'Event status' })
  status: string;

  @ApiProperty({ example: '50', description: 'Last score' })
  lastScore: string;

  @ApiProperty({ type: ImagesResponseDto, description: 'Event logo image' })
  Images_Events_imgLogoIdToImages: ImagesResponseDto;

  @ApiProperty({ type: ImagesResponseDto, description: 'Event poster image' })
  Images_Events_imgPosterIdToImages: ImagesResponseDto;

  @ApiProperty({ example: 601, description: 'Total clicks' })
  totalClicks: number;

  @ApiProperty({ example: 300, description: 'Weekly clicks' })
  weekClicks: number;
}

export class EventResponse{
  @ApiProperty({ example: 200, description: 'Status code' })
  statusCode: number;

  @ApiProperty({ example: 'Events retrieved successfully', description: 'Message' })
  message: string;

  @ApiProperty({ type: [EventDto], description: 'Events data list' })
  data: EventDto[];
}