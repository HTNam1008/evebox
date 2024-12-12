import { Controller, Get, Param  } from "@nestjs/common";
import { RecommendService } from "./recommend.service";

@Controller("api/event")
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Get(':id/recommend')
  async recommendEvents(@Param('id') eventId: number) {
    return this.recommendService.getRecommendedEvents(Number(eventId));
  }
}