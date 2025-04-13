import { Controller, Get, Res, HttpStatus, UseGuards, Param, Request } from '@nestjs/common';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetEventSummaryService } from '../getSummary/getSummary.service';
import { GetOrdersResponse } from './getOrders-response.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { GetOrdersService } from './getOrders.service';

@ApiTags('Org - Statistics')
@Controller('api/org/statistics')
export class GetOrdersController {
  constructor(private readonly getOrdersService: GetOrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('orders/:showingId')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiOperation({ summary: 'Get orders of a showing (hardcoded for now)' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully', type: GetOrdersResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getOrders(@Res() res: Response,
    @Param('showingId') showingId: string,
    @Request() req,
  ){
    try {
      const user = req.user

      const result = await this.getOrdersService.getOrders(
        showingId,
        user.email,
      );

      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Orders retrieved successfully',
        data: result.unwrap(),
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
