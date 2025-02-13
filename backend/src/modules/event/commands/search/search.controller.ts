import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { SearchService } from './search.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/event')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/search')
  @ApiOperation({ summary: 'Search events by title' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Events found successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  async search(@Query('title') title: string, @Res() res: Response) {
    const result = await this.searchService.execute(title);

    if (result.isErr()) {
      const error = result.unwrapErr();
      const statusCode = HttpStatus.BAD_REQUEST;

      return res.status(statusCode).json({
        statusCode,
        message: error.message,
      });
    }

    const data = result.unwrap();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Events found successfully',
      data,
    });
  }
}
