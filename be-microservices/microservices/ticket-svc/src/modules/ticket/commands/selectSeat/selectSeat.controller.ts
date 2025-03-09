import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { SelectSeatDto } from './selectSeat.dto';
import { SelectSeatService } from './selectSeat.service';

@Controller('api/ticket')
export class SelectSeatController {
  constructor(private readonly selectSeatService: SelectSeatService) {}

  @Post('/selectSeat')
  @ApiOperation({ summary: 'Select seats for a booking' })
  @ApiBody({ type: SelectSeatDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Seats successfully selected',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Seats not available',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async selectSeat(@Body() selectSeatDto: SelectSeatDto, @Res() res: Response) {
    const result = await this.selectSeatService.execute(selectSeatDto);
    await this.selectSeatService.logRedisData();
    if (result.isErr()) {
      const error = result.unwrapErr();
      return res
        .status(error.message.includes('Seat is already selected') ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST)
        .json(ErrorHandler.badRequest(error.message));
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Seats successfully selected',
      data: result.unwrap(),
    });
  }
}
