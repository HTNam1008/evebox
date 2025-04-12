import { Controller, Get, Request, Param, Query, Res, UseGuards, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ApiHeader, ApiQuery, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guard/jwt-auth.guard";
import { GetEventSummaryService } from "./getSummary.service";
import { EventSummaryResponse } from "./getSummary-response.dto";

@ApiTags('Org - Statistics')
@Controller('api/org/statistics')
export class GetEventSummaryController {
  constructor(private readonly getEventSummaryService: GetEventSummaryService) { }

  @UseGuards(JwtAuthGuard)
  @Get('summary/:showingId')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authorization (`Bearer <token>`)',
    required: true
  })
  @ApiOperation({ summary: 'Get summary of a event' })
  @ApiResponse({ status: 200, description: 'Event summary retrieved successfully', type: EventSummaryResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getEventSummary(
    @Request() req,
    @Param('showingId') showingId: string,
    @Res() res: Response,
  ) {
    try {
      const user = req.user;
      const result = await this.getEventSummaryService.getEventSummary(showingId, user.email);

      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Event summary retrieved successfully',
        data: result.unwrap()
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      })
    }
  }

  @Get('orders/showingId')
  async getOrders(
    @Res() res: Response,
  )
  {
    try{
      const result = await this.getEventSummaryService.getOrders('412949459297', 'dattruong01082@gmail.com')
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Event summary retrieved successfully',
        data: result.unwrap()
      });
    }
    catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      })
    }
  }

}