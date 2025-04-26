import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";

import { ImagesResponseData } from "src/modules/images/commands/images/images-response.dto";

class CategoriesResponseDto {
  @ApiProperty( { example: 1 , description: 'The ID of the category' })
  id: number;

  @ApiProperty( { example: 'Nature' , description: 'The name of the category' })
  name: string;

  @ApiProperty( { example: '2021-09-01T00:00:00.000Z' , description: 'The date the category was created' })
  createdAt: Date;
}

export class EventFrontDisplayDto {
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


class eventCategoriesSpectial {
  @ApiProperty( { type: CategoriesResponseDto, description: 'Category' })
  category: CategoriesResponseDto;

  @ApiProperty( { type: [EventFrontDisplayDto], description: 'Events' })
  events: EventFrontDisplayDto[];
}
export class GetEventFrontDisplayDTO {
  @ApiProperty( { type: [EventFrontDisplayDto], description: 'Special events' })
  specialEvents: EventFrontDisplayDto[];

  @ApiProperty( { type: [EventFrontDisplayDto], description: 'Trending events' })
  trendingEvents: EventFrontDisplayDto[];

  @ApiProperty( { type: [EventFrontDisplayDto], description: 'Only on eve events' })
  onlyOnEve: EventFrontDisplayDto[];

  @ApiProperty( { type: [eventCategoriesSpectial], description: 'Categories Special events' })
  categorySpecial: eventCategoriesSpectial[];
}

export class GetEventFrontDisplayResponse {
  @ApiProperty( { example: 200, description: 'Status code' })
  statusCode: number;

  @ApiProperty( { example: 'Front display data retrieved successfully', description: 'Message' })
  message: string;

  @ApiProperty( { type: GetEventFrontDisplayDTO, description: 'Front display data' })
  data: GetEventFrontDisplayDTO;
}