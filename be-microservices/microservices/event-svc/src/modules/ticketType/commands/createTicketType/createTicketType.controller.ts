import { Controller, Get, Request, Res, HttpStatus, Post, Body, UseGuards, UseInterceptors, UploadedFiles, Param, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateTicketTypeService } from './createTicketType.service';
import { CreateTicketTypeResponseDto } from './createTicketType-response.dto';
import { create } from 'domain';
import { CreateTicketTypeDto } from './createTicketType.dto';

@ApiTags('Org - Ticket Type')
@Controller('api/org/ticketType')
export class CreateTicketTypeController {
  constructor(private readonly createTicketTypeService: CreateTicketTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create/:showingId')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new ticket type' })
  @ApiResponse({ status: 201, description: 'Ticket type created successfully', type: CreateTicketTypeResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('file'))
  async createEvent(
    @Body() createTicketTypeDto: CreateTicketTypeDto,
    @Param('showingId') showingId: string,
    @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try{
      const result = await this.createTicketTypeService.createTicketType(createTicketTypeDto, showingId, file);
      
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'TicketType created successfully',
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
