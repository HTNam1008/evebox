import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/constants/baseResponse';

export class UpdateFormResponseDto extends BaseResponse {
  @ApiProperty({ example: 1 })
  formId: number;
}