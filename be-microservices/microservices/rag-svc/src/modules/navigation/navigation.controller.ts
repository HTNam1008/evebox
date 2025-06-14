// src/controllers/rag.controller.ts
import { Controller, Post, Body, Query } from '@nestjs/common';
import { NavigationService } from './navigation.service';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}
  
  @Post()
  async navigation(
    @Query('query') query: string,
  ) {

    const answer = await this.navigationService.select_route(
      query,
    );

    return { result: answer };
  }
}
