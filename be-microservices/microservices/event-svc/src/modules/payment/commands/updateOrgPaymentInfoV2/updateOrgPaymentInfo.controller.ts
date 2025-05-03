import { Controller, Put, Param, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { UpdateOrgPaymentInfoServiceV2 } from './updateOrgPaymentInfo.service';
import { UpdateOrgPaymentInfoDtoV2 } from './updateOrgPaymentInfo.dto';
import { UpdateOrgPaymentInfoResponseDtoV2 } from './updateOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment/v2')
export class UpdateOrgPaymentInfoControllerV2 {
  constructor(private readonly updateOrgPaymentInfoService: UpdateOrgPaymentInfoServiceV2) {}
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update Org Payment Information by id' })
  @ApiParam({ name: 'id', type: String, description: 'OrgPaymentInfo ID to update' })
  @ApiBody({ type: UpdateOrgPaymentInfoDtoV2 })
  @ApiResponse({ status: HttpStatus.OK, description: 'OrgPaymentInfo updated successfully', type: UpdateOrgPaymentInfoResponseDtoV2 })
  async updatePaymentInfo(
    @Param('id') id: string,
    @Body() dto: UpdateOrgPaymentInfoDtoV2,
    @Res() res: Response,
  ) {
    const result = await this.updateOrgPaymentInfoService.execute(id, dto);
    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: result.unwrapErr().message,
      });
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OrgPaymentInfo updated successfully',
      data: { id: result.unwrap() },
    });
  }
}