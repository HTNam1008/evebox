import { Controller, Get, Req, Res, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { GetOrgPaymentInfoService } from './getOrgPaymentInfo.service';
import { GetOrgPaymentInfoResponseDto } from './getOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment')
export class GetOrgPaymentInfoController {
  constructor(private readonly getOrgPaymentInfoService: GetOrgPaymentInfoService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authorization (Bearer <token>)',
    required: true
  })
  @ApiQuery({ name: 'eventId', type: Number, description: 'Event ID associated with the payment info', required: true })
  @ApiOperation({ summary: 'Get OrgPaymentInfo by organizerId' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OrgPaymentInfo retrieved successfully', type: GetOrgPaymentInfoResponseDto })
  async getOrgPaymentInfo(@Req() req: any, @Res() res: Response, @Query('eventId') eventId: number) {
    const organizerId = req.user.email;
    const result = await this.getOrgPaymentInfoService.execute(organizerId, eventId);
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
