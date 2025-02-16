import { ApiProperty } from "@nestjs/swagger";

import { EventDto } from "../event/event-response.dto";
import { CategoriesResponseDto } from "../categories/categories-response.dto";

class eventCategoriesSpectial {
  @ApiProperty( { type: CategoriesResponseDto, description: 'Category' })
  category: CategoriesResponseDto;

  @ApiProperty( { type: [EventDto], description: 'Events' })
  events: EventDto[];
}
export class EventFrontDisplayDTO {
  @ApiProperty( { type: [EventDto], description: 'Special events' })
  specialEvents: EventDto[];

  @ApiProperty( { type: [EventDto], description: 'Trending events' })
  trendingEvents: EventDto[];

  @ApiProperty( { type: [EventDto], description: 'Only on eve events' })
  onlyOnEve: EventDto[];

  @ApiProperty( { type: [eventCategoriesSpectial], description: 'Categories Special events' })
  categorySpecial: eventCategoriesSpectial[];
}

export class FrontDisplayResponse {
  @ApiProperty( { example: 200, description: 'Status code' })
  statusCode: number;

  @ApiProperty( { example: 'Front display data retrieved successfully', description: 'Message' })
  message: string;

  @ApiProperty( { type: EventFrontDisplayDTO, description: 'Front display data' })
  data: EventFrontDisplayDTO;
}