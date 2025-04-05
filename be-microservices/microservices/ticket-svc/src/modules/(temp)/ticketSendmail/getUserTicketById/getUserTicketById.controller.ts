import { Controller, Get, Query, Res, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { GetUserTicketByIdService } from './getUserTicketById.service';
import { GetUserTicketByIdResponseDto } from './getUserTicketById-response.dto';

@ApiTags('Temp')
@Controller('api/temp')
export class GetUserTicketByIdController {
  constructor(private readonly getUserTicketByIdService: GetUserTicketByIdService) {}

  @Get('/sendTicketMail')
  @ApiOperation({ summary: 'Get status of all payment method' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ticket data retrieved successfully',
    type: GetUserTicketByIdResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getShowing(
    @Res() res: Response,
    ) {
    // const email = 'dattruong01082@gmail.com';
    const result = await this.getUserTicketByIdService.execute();
    if (result.isErr()) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ErrorHandler.internalServerError(result.unwrapErr().message));
    }

    const data = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Ticket data retrieved successfully',
      data,
    });
  }
}