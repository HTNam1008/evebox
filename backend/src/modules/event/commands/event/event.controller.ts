import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './event.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';

@Controller('api/events')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Event created successfully' })
  @UseInterceptors(FilesInterceptor('files'))
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response
  ) {
    const result = await this.eventsService.createEvent(createEventDto, files);

    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json(ErrorHandler.badRequest(result.unwrapErr().message));
    }

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Event created successfully',
      data: result.unwrap(),
    });
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Events retrieved successfully' })
  async getAllEvents(@Res() res: Response) {
    const result = await this.eventsService.findAll();

    if (result.isErr()) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ErrorHandler.internalServerError(result.unwrapErr().message));
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Events retrieved successfully',
      data: result.unwrap(),
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Event retrieved successfully' })
  async getEvent(@Param('id') id: string, @Res() res: Response) {
    const result = await this.eventsService.findOne(Number(id));

    if (result.isErr()) {
      return res.status(HttpStatus.NOT_FOUND).json(ErrorHandler.notFound(result.unwrapErr().message));
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Event retrieved successfully',
      data: result.unwrap(),
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update event by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Event updated successfully' })
  @UseInterceptors(FilesInterceptor('files'))
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response
  ) {
    const result = await this.eventsService.updateEvent(Number(id), updateEventDto, files);

    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json(ErrorHandler.badRequest(result.unwrapErr().message));
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Event updated successfully',
      data: result.unwrap(),
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete event by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Event deleted successfully' })
  async deleteEvent(@Param('id') id: string, @Res() res: Response) {
    const result = await this.eventsService.deleteEvent(Number(id));

    if (result.isErr()) {
      return res.status(HttpStatus.NOT_FOUND).json(ErrorHandler.notFound(result.unwrapErr().message));
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Event deleted successfully',
    });
  }
}
