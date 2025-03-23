import { Controller, Patch, Request, Res, HttpStatus, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTicketTypeService } from './updateTicketType.service';
import { UpdateTicketTypeDto } from './updateTicketType.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTicketTypeResponseDto } from './updateTicketType-response.dto';

@ApiTags('TicketType')
@Controller('api/ticketType')
export class UpdateTicketTypeController {
  constructor(private readonly updateTicketTypeService: UpdateTicketTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update an existing ticket type' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ticket type updated successfully', type: UpdateTicketTypeResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('file'))
  async updateTicketType(
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
    @Request() req,
    @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      if (!updateTicketTypeDto.id && req.params.id) {
        updateTicketTypeDto.id = req.params.id;
      }
      if (file) {
        updateTicketTypeDto.img = file;
      }
      const result = await this.updateTicketTypeService.updateTicketType(updateTicketTypeDto);
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Ticket type updated successfully',
        data: { ticketTypeId: result.unwrap() },
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