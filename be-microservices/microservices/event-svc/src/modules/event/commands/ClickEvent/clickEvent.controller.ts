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