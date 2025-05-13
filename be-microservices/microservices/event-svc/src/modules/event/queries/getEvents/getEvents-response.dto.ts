import { ApiProperty } from "@nestjs/swagger";
import { ImagesResponseData } from "src/modules/images/commands/images/images-response.dto";
import { BaseResponse } from "src/shared/constants/baseResponse";

class CategoriesResponseDto {
  @ApiProperty( { example: 1 , description: 'The ID of the category' })
  id: number;

  @ApiProperty( { example: 'music' , description: 'The name of the category' })
  name: string;
}

export class EventDataDto {
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

  @ApiProperty({
    example: '2024-12-28T13:00:00.000Z',
    description: 'Event created date in ISO format'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-12-28T13:00:00.000Z',
    description: 'Event deleted at date in ISO format',
  })
  deleteAt: Date;

  @ApiProperty({ type: ImagesResponseData, description: 'Event logo image' })
  Images_Events_imgLogoIdToImages: ImagesResponseData;

  @ApiProperty({ type: ImagesResponseData, description: 'Event poster image' })
  Images_Events_imgPosterIdToImages: ImagesResponseData;

  @ApiProperty({ example: '12 duong 3/2', description: 'Event address' })
  locationString: string;

  @ApiProperty({ example: 'Nha hat Ben Thanh', description: 'Event venue' })
  venue: string;

  @ApiProperty({ example: true, description: 'Event is approved' })
  isApproved: boolean;

  @ApiProperty({ example: true, description: 'Event is special' })
  isSpecial: boolean;

  @ApiProperty({ example: true, description: 'Event is only on EveBox' })
  isOnlyOnEve: boolean;

  @ApiProperty({ example: true, description: 'Event is online or offline' })
  isOnline: boolean;

  @ApiProperty({ type: [CategoriesResponseDto], description: 'List categories of event' })
  categories: CategoriesResponseDto[]
}

export class EventDataResponse extends BaseResponse {
  @ApiProperty({ type: [EventDataDto], description: 'List of events' })
  data: EventDataDto[];
}