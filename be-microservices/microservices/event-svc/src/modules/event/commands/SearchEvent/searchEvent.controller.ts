import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { SearchEventService } from './searchEvent.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchEventResponse } from './searchEvent-response.dto';

@ApiTags('Event')
@Controller('api/event')
export class SearchEventController {
  constructor(private readonly searchService: SearchEventService) {}

  @Get('/search')
  @ApiOperation({ summary: 'Search events by title' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Events found successfully',
    type: SearchEventResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  async search(@Query('title') title: string, @Query('type') type: string, @Query('startDate') startDate: string,
  @Query('endDate') endDate: string, @Res() res: Response) {
    const typeArray = type ? type.split(',').map((item) => item.trim()) : [];
    const result = await this.searchService.execute(title,typeArray,startDate,endDate);

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
