import { Controller, Get, Post } from '@nestjs/common';
import { FrontDisplayService, FrontDisplayData } from './front-display.service';

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

}
