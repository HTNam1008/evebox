import { Controller, Get, Post, Query, HttpStatus, Res } from "@nestjs/common";
import { ClickEventService } from "./clickEvent.service";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';

@ApiTags('Event')
@Controller('api/event/detail')
export class ClickEventController {
  constructor(private readonly eventDetailService: ClickEventService) {}

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
    @Query('userId') userId: string, 
    @Res() res: Response,
  ) {
    const parsedEventId = parseInt(eventId);
  if (isNaN(parsedEventId)) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(ErrorHandler.badRequest('Invalid eventId'));
  }

  const result = await this.eventDetailService.postClicks(parsedEventId, userId); // 🔸 Pass userId

  if (result.isErr()) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(ErrorHandler.badRequest(result.unwrapErr().message));
  }

  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Click count updated successfully',
    data: result.unwrap(),
  });
  }

}