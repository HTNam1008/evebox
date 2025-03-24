import { Controller, Patch, Request, Res, HttpStatus, Body, UseGuards, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateEventService } from './updateEvent.service';
import { UpdateEventDto } from './updateEvent.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EventResponse } from './updateEvent-response.dto';

@ApiTags('Org - Event')
@Controller('api/org/event')
export class UpdateEventController {
  constructor(private readonly updateEventService: UpdateEventService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authorization (`Bearer <token>`)',
    required: true
  })
  @ApiOperation({ summary: 'Update an existing event' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Event updated successfully', type: EventResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imgLogo', maxCount: 1 },
    { name: 'imgPoster', maxCount: 1 },
  ]))
  async updateEvent(
    @Body() updateEventDto: UpdateEventDto,
    @Request() req,
    @Res() res: Response,
    @UploadedFiles() files: { imgLogo?: Express.Multer.File[]; imgPoster?: Express.Multer.File[] }
  ) {
    try {
      const user = req.user;
      if (files.imgLogo && files.imgLogo.length > 0) {
        updateEventDto.imgLogo = files.imgLogo[0];
      }
      if (files.imgPoster && files.imgPoster.length > 0) {
        updateEventDto.imgPoster = files.imgPoster[0];
      }

      const result = await this.updateEventService.execute(updateEventDto, user.email, req.params.id);

      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Event updated successfully',
        data: result.unwrap(),
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}