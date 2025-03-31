import { Controller, Put, Param, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { UpdateOrgPaymentInfoService } from './updateOrgPaymentInfo.service';
import { UpdateOrgPaymentInfoDto } from './updateOrgPaymentInfo.dto';
import { UpdateOrgPaymentInfoResponseDto } from './updateOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment')
export class UpdateOrgPaymentInfoController {
  constructor(private readonly updateOrgPaymentInfoService: UpdateOrgPaymentInfoService) {}
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update Org Payment Information by id' })
  @ApiParam({ name: 'id', type: String, description: 'OrgPaymentInfo ID to update' })
  @ApiBody({ type: UpdateOrgPaymentInfoDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'OrgPaymentInfo updated successfully', type: UpdateOrgPaymentInfoResponseDto })
  async updatePaymentInfo(
    @Param('id') id: string,
    @Body() dto: UpdateOrgPaymentInfoDto,
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