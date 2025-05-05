import { Controller, Get, Res, HttpStatus, UseGuards, Request } from "@nestjs/common";
import { Response } from "express";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetRevenueByTicketPriceService } from "./getRevenueByTicketPrice.service";
import { RevenueByTicketPriceResponseDto } from "./getRevenueByTicketPrice-response.dto";
import { JwtAuthGuard } from "src/shared/guard/jwt-auth.guard";

@ApiTags('Admin - Statistics')
@Controller('api/admin')
export class GetRevenueByTicketPriceController {
  constructor(private readonly getRevenueByTicketPriceService: GetRevenueByTicketPriceService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/revenue-by-ticket-price')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get revenue by ticket price' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Revenue by ticket price retrieved successfully', type: RevenueByTicketPriceResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You do not have permission to get org revenue' })
  async execute(
    @Res() res: Response,
    @Request() req
  ) {
    try {
      const email = req.user?.email;

      const result = await this.getRevenueByTicketPriceService.execute(email);

      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Revenue by ticket price retrieved successfully',
        data: result.unwrap(),
      });
    } catch (error) {
      console.log("🚀 ~ GetRevenueByTicketPriceController ~ error:", error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}