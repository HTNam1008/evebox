import { Controller, Get, Res, HttpStatus, UseGuards, Request } from "@nestjs/common";
import { Response } from "express";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetOrgRevenueByProvinceService } from "./getOrgRevenueByProvince.service";
import { ProvinceRevenueResponseDto } from "./getOrgRevenueByProvince-response.dto";
import { JwtAuthGuard } from "src/shared/guard/jwt-auth.guard";

@ApiTags('Admin - Statistics')
@Controller('api/admin')
export class GetOrgRevenueByProvinceController {
  constructor(private readonly getOrgRevenueByProvinceService: GetOrgRevenueByProvinceService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/revenue-by-province')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get organizer revenue by province' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Organizer revenue by province retrieved successfully', type: ProvinceRevenueResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You do not have permission to get org revenue' })
  async execute(
    @Res() res: Response,
    @Request() req
  ) {
    try {
      const email = req.user?.email;

      const result = await this.getOrgRevenueByProvinceService.execute(email);

      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Organizer revenue retrieved successfully',
        data: result.unwrap(),
      });
    } catch (error) {
      console.log("🚀 ~ GetOrgRevenueByProvinceController ~ error:", error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}