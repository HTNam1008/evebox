import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';

import { ShowingService } from './showing.service';

@Controller('api/showing')
export class ShowingController {
  constructor(private readonly showingService: ShowingService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get showing data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Showing data retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getShowing(@Query('showingId') showingId: string, @Res() res: Response) {
    const result = await this.showingService.execute(showingId);

    if (result.isErr()) {
      const error = result.unwrapErr();
      return res
        .status(error.message === "Showing not found." ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST)
        .json(error.message === "Showing not found." ? ErrorHandler.notFound(result.unwrapErr().message) : ErrorHandler.badRequest(result.unwrapErr().message));
    }

    const data = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Showing data retrieved successfully',
      data,
    });
  }

  @Get('/seatmap')
  @ApiOperation({ summary: 'Get seat map' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Seat map retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Seat map not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getSeatMap(@Query('showingId') showingId: string, @Res() res: Response) {
    const result = await this.showingService.getSeatMap(showingId);

    if (result.isErr()) {
      const error = result.unwrapErr();
      return res
        .status(error.message === "Seat map not found." ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST)
        .json(error.message === "Seat map not found." ? ErrorHandler.notFound(result.unwrapErr().message) : ErrorHandler.badRequest(result.unwrapErr().message));
    }

    const data = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Seat map retrieved successfully',
      data,
    });
  }
}