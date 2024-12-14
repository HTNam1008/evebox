import { Controller, Get, Query } from "@nestjs/common";
import { EventDetailService } from "./detail.service";
import { EventData, EventFrontDisplay } from "../../domain/entities/event.entity";

@Controller('api/event')
export class EventDetailController {
  constructor(private readonly eventDetailService: EventDetailService) {}

  @Get('/detail')
  async getEventDetail(@Query('eventId') eventId: string): Promise<EventData> {
    const result = await this.eventDetailService.execute(parseInt(eventId));

    if (result.isOk()) {
      return result.unwrap();
    }

    throw result.unwrapErr();
  }

  @Get('/detail/recommended-events')
  async getRecommendedEventsInDetail(@Query('eventId') eventId: string, @Query('limit') limit: string): Promise<EventFrontDisplay[]> {
    const result = await this.eventDetailService.getRecommendedEventsInDetail(parseInt(eventId), limit);

    if (result.isOk()) {
      return result.unwrap();
    }

    throw result.unwrapErr();
  }
}