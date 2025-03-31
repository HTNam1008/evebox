import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/constants/baseResponse';

export class ConnectFormResponseDto extends BaseResponse {
  @ApiProperty({ type: Object, description: 'Data containing showingId and connected formId' })
  data: {
    showingId: string;
    formId: number;
  };
}