import { Controller, Get, Query } from '@nestjs/common';
import { FrontDisplayService } from './front-display.service';
import { FrontDisplayData, EventFrontDisplay } from '../../domain/entities/event.entity';

@Controller('api/event')
export class FrontDisplayController {
  constructor(private readonly frontDisplayService: FrontDisplayService) {}

  @Get('front-display')
  async getFrontDisplay(): Promise<FrontDisplayData> {
    const result = await this.frontDisplayService.execute();

    if (result.isOk()) {
      return result.unwrap();
    }

    throw result.unwrapErr();
  }

  @Get('recommended-events')
  async getRecommendedEvents(@Query('timeWindow') timeWindow: "week" | "month"): Promise<EventFrontDisplay[]> {
    const result = await this.frontDisplayService.getRecommendedEvents(timeWindow);

    if (result.isOk()) {
      return result.unwrap();
    }

    throw result.unwrapErr();
  }
}
