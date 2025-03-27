import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { ConnectFormService } from './connectShowingToForm.service';
import { ConnectFormDto } from './connectShowingToForm.dto';
import { ConnectFormResponseDto } from './connectShowingToForm-response.dto';
import { Response } from 'express';

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class ConnectFormController {
  constructor(private readonly connectFormService: ConnectFormService) {}

  @Post('/connect-form')
  @ApiOperation({ summary: 'Connect an existing form to a showing' })
  @ApiBody({ type: ConnectFormDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Form connected successfully', type: ConnectFormResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async connectForm(@Body() connectFormDto: ConnectFormDto, @Res() res: Response) {
    const result = await this.connectFormService.execute(connectFormDto);
    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: result.unwrapErr().message,
      });
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Form connected successfully',
      data: { showingId: connectFormDto.showingId, formId: connectFormDto.formId },
    });
  }
}