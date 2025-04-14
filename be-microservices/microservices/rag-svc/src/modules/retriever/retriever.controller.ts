// retriever.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { RetrieverService } from './retriever.service';

@Controller('retriever')
export class RetrieverController {
  constructor(private readonly retrieverService: RetrieverService) {}

  @Get()
  async search(
    @Query('query') query: string,
    @Query('amount') amount = 5,
    @Query('threshold') threshold = 0.5,
  ) {
    const result = await this.retrieverService.search(query, +amount, +threshold);
    const ids = result.map((doc) => doc.metadata?.id ?? 'unknown');

    return {
      status: 200,
      data: { result: ids },
    };
  }
}
