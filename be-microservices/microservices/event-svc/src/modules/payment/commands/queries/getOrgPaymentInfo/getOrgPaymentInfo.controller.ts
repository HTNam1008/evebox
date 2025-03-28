import { Controller, Get, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { GetOrgPaymentInfoService } from './getOrgPaymentInfo.service';
import { GetOrgPaymentInfoResponseDto } from './getOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment')
export class GetOrgPaymentInfoController {
  constructor(private readonly getOrgPaymentInfoService: GetOrgPaymentInfoService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get OrgPaymentInfo by organizerId' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OrgPaymentInfo retrieved successfully', type: GetOrgPaymentInfoResponseDto })
  async getOrgPaymentInfo(@Req() req: any, @Res() res: Response) {
    // Lấy organizerId từ token (ví dụ, req.user.id hoặc req.user.email tùy vào cấu hình)
    const organizerId = req.user.id;
    const result = await this.getOrgPaymentInfoService.execute(organizerId);
    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: result.unwrapErr().message,
      });
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OrgPaymentInfo retrieved successfully',
      data: result.unwrap(),
    });
  }
}
