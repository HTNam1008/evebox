import { Controller, Delete, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { DeleteOrgPaymentInfoService } from './deleteOrgPaymentInfo.service';
import { DeleteOrgPaymentInfoDto } from './deleteOrgPaymentInfo.dto';
import { DeleteOrgPaymentInfoResponseDto } from './deleteOrgPaymentInfo-response.dto';

@ApiTags('Org - Payment')
@Controller('api/org/payment')
export class DeleteOrgPaymentInfoController {
  constructor(private readonly deleteOrgPaymentInfoService: DeleteOrgPaymentInfoService) {}

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Org Payment Information' })
  @ApiParam({ name: 'id', type: String, description: 'OrgPaymentInfo ID to delete' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OrgPaymentInfo deleted successfully', type: DeleteOrgPaymentInfoResponseDto })
  async deletePaymentInfo(@Param('id') id: string, @Res() res: Response) {
    const dto: DeleteOrgPaymentInfoDto = { id };
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