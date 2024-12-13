import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/event')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  async search(@Query('title') title: string) {
    return this.searchService.execute(title);
  }
}