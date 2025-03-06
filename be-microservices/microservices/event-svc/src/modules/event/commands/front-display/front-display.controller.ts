import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { FrontDisplayService } from './front-display.service';
import { Response } from 'express';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { EventResponse } from '../event/event-response.dto';
import { FrontDisplayResponse } from './front-display-response.dto';

@Controller('api/event')
export class FrontDisplayController {
  constructor(private readonly frontDisplayService: FrontDisplayService) {}

  @Get('/front-display')
  @ApiOperation({ summary: 'Get front display data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Front display data retrieved successfully',
    type: FrontDisplayResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Fetch front display data failed',
  })
  async getFrontDisplay(@Res() res: Response) {
    const result = await this.frontDisplayService.execute();

    if (result.isErr()) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
    }

    const data = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Front display data retrieved successfully',
      data,
    });
  }

  @Get('/recommended-events')
  @ApiOperation({ summary: 'Get recommended events' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recommended events retrieved successfully',
    type: EventResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiQuery({
    name: 'timeWindow',
    enum: ['week', 'month'],
    required: true,
    description: 'Time window for recommended events (week or month)',
  })
  async getRecommendedEvents(
    @Query('timeWindow') timeWindow: 'week' | 'month',
    @Res() res: Response,
  ) {
    const result = await this.frontDisplayService.getRecommendedEvents(timeWindow);

    if (result.isErr()) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
    }

    const data = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Recommended events retrieved successfully',
      data,
    });
  }
}
