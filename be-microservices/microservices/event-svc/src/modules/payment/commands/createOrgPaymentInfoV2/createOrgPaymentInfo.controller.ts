import { Controller, Post, Body, Request, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {  ApiBody, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { CreateOrgPaymentInfoServiceV2 } from './createOrgPaymentInfo.service';
import { CreateOrgPaymentInfoDtoV2 } from './createOrgPaymentInfo.dto';
import { CreateOrgPaymentInfoResponseDtoV2 } from './createOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment/v2')
export class CreateOrgPaymentInfoControllerV2 {
  constructor(private readonly createOrgPaymentInfoService: CreateOrgPaymentInfoServiceV2) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiBody({ type: CreateOrgPaymentInfoDtoV2 })
  @ApiOperation({ summary: 'Create Org Payment Information' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'OrgPaymentInfo created successfully', type: CreateOrgPaymentInfoResponseDtoV2 })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  async createPaymentInfo(
    @Request() req,
    @Body() createOrgPaymentInfoDto: CreateOrgPaymentInfoDtoV2,
    @Res() res: Response,
  ) {
    try {
      // Use organizer id from token if needed
      const organizerId = req.user.email;
      const result = await this.createOrgPaymentInfoService.execute(createOrgPaymentInfoDto, organizerId);
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'OrgPaymentInfo created successfully',
        data: { id: result.unwrap() },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}