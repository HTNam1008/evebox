import { Controller, Get, Request, Res, HttpStatus, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventService } from './createEvent.service';
import { CreateEventDto } from './createEvent.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Event')
@Controller('api/event')
export class CreateEventController {
  constructor(private readonly createEventService: CreateEventService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Event created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imgLogo', maxCount: 1 },
    { name: 'imgPoster', maxCount: 1 },
  ]))
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @Request() req,
    @Res() res: Response,
    @UploadedFiles() files: { imgLogo?: Express.Multer.File[]; imgPoster?: Express.Multer.File[] }
  ) {
    try{
      const user = req.user;
      if(!files.imgLogo || !files.imgPoster || files.imgLogo.length === 0 || files.imgPoster.length === 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Images are required',
        });
      }
      const imgLogo = files.imgLogo ? files.imgLogo[0] : null;
      const imgPoster = files.imgPoster ? files.imgPoster[0] : null;

      const result = await this.createEventService.execute(createEventDto, user.email, imgLogo, imgPoster);
      
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
