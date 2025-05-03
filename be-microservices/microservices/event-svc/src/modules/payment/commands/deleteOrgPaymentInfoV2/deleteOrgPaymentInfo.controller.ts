import { Controller, Delete, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { DeleteOrgPaymentInfoServiceV2 } from './deleteOrgPaymentInfo.service';
import { DeleteOrgPaymentInfoDtoV2 } from './deleteOrgPaymentInfo.dto';
import { DeleteOrgPaymentInfoResponseDtoV2 } from './deleteOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment/v2')
export class DeleteOrgPaymentInfoControllerV2 {
  constructor(private readonly deleteOrgPaymentInfoService: DeleteOrgPaymentInfoServiceV2) {}

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Org Payment Information' })
  @ApiParam({ name: 'id', type: String, description: 'OrgPaymentInfo ID to delete' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OrgPaymentInfo deleted successfully', type: DeleteOrgPaymentInfoResponseDtoV2 })
  async deletePaymentInfo(@Param('id') id: string, @Res() res: Response) {
    const dto: DeleteOrgPaymentInfoDtoV2 = { id };
    const result = await this.deleteOrgPaymentInfoService.execute(dto);
    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: result.unwrapErr().message,
      });
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OrgPaymentInfo deleted successfully',
      data: { id: result.unwrap() },
    });
  }
}