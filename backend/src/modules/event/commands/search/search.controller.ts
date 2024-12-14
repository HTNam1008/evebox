import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { EventSearchData } from '../../domain/entities/event.entity';

@Controller('api/event')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  async search(@Query('title') title: string) : Promise<EventSearchData[]> {
    const result = await this.searchService.execute(title);

    if (result.isOk()) {
      return result.unwrap();
    }

    throw result.unwrapErr();
  }
}