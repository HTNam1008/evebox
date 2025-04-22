import { Controller, Get, HttpStatus, Param, Res, Request } from "@nestjs/common";
import { GetAllShowingTimeOfEventService } from "./getAllShowingTimeOfEvent.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetAllShowingTimeOfEventResponseDto } from "./getAllShowingTimeOfEvent-response.dto";
import { Response } from 'express';

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class GetAllShowingTimeOfEventController {
  constructor(private readonly getAllShowingTimeOfEventService: GetAllShowingTimeOfEventService) {}

  @Get('showingTime/:eventId')
  @ApiOperation({ summary: 'Get all showing time of Event' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all showing time of Event of Organizer',
    type: GetAllShowingTimeOfEventResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getShowingTime(
    @Param('eventId') eventId: number,
    @Res() res: Response,
  ) {
    try{
      const result = await this.getAllShowingTimeOfEventService.findAll(eventId>>0);
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Get all showing time of Event of Organizer successfully',
        data: result.unwrap(),
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }    
  }
}