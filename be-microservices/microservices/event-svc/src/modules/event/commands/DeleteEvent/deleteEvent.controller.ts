import { Controller, Delete, Request, Res, HttpStatus, Body, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteEventService } from './deleteEvent.service';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { EventResponse } from './deleteEvent-response.dto';

@ApiTags('Event')
@Controller('api/event')
export class DeleteEventController {
  constructor(private readonly deleteEventService: DeleteEventService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Event deleted successfully', type: EventResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async deleteEvent(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {

      const result = await this.deleteEventService.execute(id);

      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Event deleted successfully',
        data: { id: result.unwrap() },
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