import { Controller, Post, Body, Request, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiHeader, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { CreateOrgPaymentInfoService } from './createOrgPaymentInfo.service';
import { CreateOrgPaymentInfoDto } from './createOrgPaymentInfo.dto';
import { CreateOrgPaymentInfoResponseDto } from './createOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment')
export class CreateOrgPaymentInfoController {
  constructor(private readonly createOrgPaymentInfoService: CreateOrgPaymentInfoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authorization (Bearer <token>)',
    required: true
  })
  @ApiBody({ type: CreateOrgPaymentInfoDto })
  @ApiOperation({ summary: 'Create Org Payment Information' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'OrgPaymentInfo created successfully', type: CreateOrgPaymentInfoResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  async createPaymentInfo(
    @Request() req,
    @Body() createOrgPaymentInfoDto: CreateOrgPaymentInfoDto,
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