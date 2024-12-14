import { Controller, Get, Query } from "@nestjs/common";
import { EventDetailService } from "./detail.service";
import { EventData, EventFrontDisplay } from "../../domain/entities/event.entity";

@Controller('api/event')
export class EventDetailController {
  constructor(private readonly eventDetailService: EventDetailService) {}

  @Get('/')
  async getEventDetail(@Query('eventId') eventId: string): Promise<EventData> {
    const result = await this.eventDetailService.execute(parseInt(eventId));

    if (result.isOk()) {
      return result.unwrap();
    }

    throw result.unwrapErr();
  }

  @Get('/recommended/')
  async getRecommendedEventsInDetail(@Query('eventId') eventId: number, @Query('locations') locations: number[]): Promise<EventFrontDisplay[]> {
    const result = await this.eventDetailService.getRecommendedEventsInDetail(eventId, locations);

    if (result.isOk()) {
      return result.unwrap();
    }

    throw result.unwrapErr();
  }
}