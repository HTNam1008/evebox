import { Controller, Get, Req, Res, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { GetOrgPaymentInfoServiceV2 } from './getOrgPaymentInfo.service';
import { GetOrgPaymentInfoResponseDtoV2 } from './getOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment/v2')
export class GetOrgPaymentInfoControllerV2 {
  constructor(private readonly getOrgPaymentInfoService: GetOrgPaymentInfoServiceV2) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get OrgPaymentInfo by organizerId' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OrgPaymentInfo retrieved successfully', type: GetOrgPaymentInfoResponseDtoV2 })
  async getOrgPaymentInfo(@Req() req: any, @Res() res: Response) {
    const organizerId = req.user.email;
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
