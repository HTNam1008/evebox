import { Controller, Get, Request, Res, HttpStatus, Post, Body, UseGuards, UseInterceptors, UploadedFiles, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateShowingService } from './createShowing.service';
import { CreateShowingDto } from './createShowing.dto';
import { CreateShowingResponseDto } from './createShowing-response.dto';

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class CreateShowingController {
  constructor(private readonly createShowingService: CreateShowingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:eventId')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authorization (`Bearer <token>`)',
    required: true
  })
  @ApiOperation({ summary: 'Create a new showing' })
  @ApiResponse({ status: 201, description: 'Showing created successfully', type: CreateShowingResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createEvent(
    @Body() CreateShowingDto: CreateShowingDto,
    @Param('eventId') eventId: number,
    @Res() res: Response,
  ) {
    try{
      const result = await this.createShowingService.createShowing(CreateShowingDto, eventId);
      
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Event created successfully',
        data: result.unwrap(),
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
