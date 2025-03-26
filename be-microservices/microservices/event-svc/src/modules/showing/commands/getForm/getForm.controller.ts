import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { GetFormService } from './getForm.service';
import { GetFormResponseDto } from './getForm-response.dto';

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class GetFormController {
  constructor(private readonly getFormService: GetFormService) {}

  @Get('form/:id')
  @ApiOperation({ summary: 'Get form by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Form ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Form retrieved successfully', type: GetFormResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Form not found' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async getForm(@Param('id') id: string, @Res() res: Response) {
    const result = await this.getFormService.execute(Number(id));
    if (result.isErr()) {
      const status = result.unwrapErr().message === 'Form not found' ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(status).json({
        statusCode: status,
        message: result.unwrapErr().message,
      });
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Form retrieved successfully',
      data: result.unwrap(),
    });
  }
}