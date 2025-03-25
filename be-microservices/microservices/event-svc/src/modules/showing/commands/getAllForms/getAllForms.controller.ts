import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { GetAllFormsService } from './getAllForms.service';
import { GetAllFormsResponseDto } from './getAllFroms-response.dto';

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class GetAllFormsController {
  constructor(private readonly getAllFormsService: GetAllFormsService) {}

  @Get('form/all')
  @ApiOperation({ summary: 'Get all forms (not deleted) for organizer' })
  @ApiQuery({ name: 'organizerId', type: String, description: 'Organizer ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Forms retrieved successfully', type: GetAllFormsResponseDto })
  async getAllForms( @Res() res: Response) {
    const result = await this.getAllFormsService.execute();
    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: result.unwrapErr().message,
      });
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Forms retrieved successfully',
      data: { forms: result.unwrap() },
    });
  }
}

