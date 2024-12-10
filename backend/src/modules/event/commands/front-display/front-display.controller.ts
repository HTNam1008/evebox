import { Controller, Get } from '@nestjs/common';
import { FrontDisplayService } from './front-display.service';

@Controller('api/event')
export class FrontDisplayController {
  constructor(private readonly frontDisplayService: FrontDisplayService) {}

  @Get('front-display')
  async getFrontDisplay() {
    return this.frontDisplayService.execute();
  }
}
