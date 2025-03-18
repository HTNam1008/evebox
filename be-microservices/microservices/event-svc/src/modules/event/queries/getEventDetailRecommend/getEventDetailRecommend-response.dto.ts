import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";
import { ImagesResponseData } from "src/modules/images/commands/images/images-response.dto";

export class GetEventDetailRecommendDto {
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
  startDate: Date;

  @ApiProperty({ example: "book_now"})
  status: string;

  @ApiProperty({ example: '50', description: 'Last score' })
  lastScore: Decimal;

  @ApiProperty({ type: ImagesResponseData, description: 'Event logo image' })
  Images_Events_imgLogoIdToImages: ImagesResponseData;

  @ApiProperty({ type: ImagesResponseData, description: 'Event poster image' })
  Images_Events_imgPosterIdToImages: ImagesResponseData;

  @ApiProperty({ example: 601, description: 'Total clicks' })
  totalClicks: number;

  @ApiProperty({ example: 300, description: 'Weekly clicks' })
  weekClicks: number;

  @ApiProperty({ example: 1000000, description: 'Minimum ticket price' })
  minTicketPrice?: number;
}

export class GetEventDetailRecommendResponse{
  @ApiProperty({ example: 200, description: 'Status code' })
  statusCode: number;

  @ApiProperty({ example: 'Events retrieved successfully', description: 'Message' })
  message: string;

  @ApiProperty({ type: [GetEventDetailRecommendDto], description: 'Events data list' })
  data: GetEventDetailRecommendDto[];
}