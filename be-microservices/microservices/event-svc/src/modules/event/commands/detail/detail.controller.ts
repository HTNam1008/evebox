import { Controller, Get, Post, Query, HttpStatus, Res } from "@nestjs/common";
import { EventDetailService } from "./detail.service";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { EventDetailResponse } from './detail-response.dto';
import { EventResponse } from "../event/event-response.dto";

@Controller('api/event/detail')
export class EventDetailController {
  constructor(private readonly eventDetailService: EventDetailService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get event details' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Event details retrieved successfully',
    type: EventDetailResponse,
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
  async getEventDetail(
    @Query('eventId') eventId: string,
    @Res() res: Response,
  ) {
    const result = await this.eventDetailService.execute(parseInt(eventId));
    if (result.isErr()) {
      const error = result.unwrapErr();
      return res
        .status(error.message === "Event not found." ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST)
        .json(error.message === "Event not found." ? ErrorHandler.notFound(result.unwrapErr().message) : ErrorHandler.badRequest(result.unwrapErr().message));
    }

    const data = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Event details retrieved successfully',
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
  })
  async getRecommendedEventsInDetail(
    @Query('eventId') eventId: string,
    @Query('limit') limit: string,
    @Res() res: Response,
  ) {
    const result = await this.eventDetailService.getRecommendedEventsInDetail(
      parseInt(eventId),
      limit,
    );

    if (result.isErr()) {
      const error = result.unwrapErr();
      return res
        .status(error.message === "Event not found." ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST)
        .json(error.message === "Event not found." ? ErrorHandler.notFound(result.unwrapErr().message) : ErrorHandler.badRequest(result.unwrapErr().message));
    }

    const data = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Recommended events retrieved successfully',
      data,
    });
  }

  @Post('/clicks')
  @ApiOperation({ summary: 'Increment event clicks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Click count updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  async postClicks(
    @Query('eventId') eventId: string,
    @Res() res: Response,
  ) {
    const result = await this.eventDetailService.postClicks(parseInt(eventId));

    if (result.isErr()) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(ErrorHandler.badRequest(result.unwrapErr().message));
    }

    const data = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Click count updated successfully',
      data,
    });
  }

}