import { Controller, Get, Query, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { GetPayOSStatusService } from './getPayOSStatus.service';
import { GetPayOSStatusResponseDto } from './getPayOSStatus-response.dto';

@Controller('api/payment')
export class GetPayOSStatusController {
  constructor(private readonly getPayOSStatusService: GetPayOSStatusService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getPayOSStatus')
  @ApiQuery({ name: 'orderCode', type: Number, required: true })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authorization (`Bearer <token>`)',
    required: true
  })
  @ApiOperation({ summary: 'Get status of all payment method' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'PayOS status data retrieved successfully',
    type: GetPayOSStatusResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'PayOS data not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getShowing(
    @Query('orderCode') orderCode: number,
    @Res() res: Response) {
    const result = await this.getPayOSStatusService.execute(orderCode);

    if (result.isErr()) {
      const error = result.unwrapErr();
      return res
        .status(error.message === 'Internal Server Error.' ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.BAD_REQUEST)
        .json(error.message === 'Internal Server Error.' ? ErrorHandler.internalServerError(result.unwrapErr().message) : ErrorHandler.badRequest(result.unwrapErr().message));
    }

    const status = result.unwrap();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Payment Method status data retrieved successfully',
      status,
    });
  }
}