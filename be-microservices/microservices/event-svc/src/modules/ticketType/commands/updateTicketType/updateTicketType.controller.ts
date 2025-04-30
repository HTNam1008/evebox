import { Controller, Patch, Request, Res, HttpStatus, Body, UseGuards, UseInterceptors, UploadedFile, Put, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTicketTypeService } from './updateTicketType.service';
import { UpdateTicketTypeDto } from './updateTicketType.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTicketTypeResponseDto } from './updateTicketType-response.dto';

@ApiTags('Org - Ticket Type')
@Controller('api/org/ticketType')
export class UpdateTicketTypeController {
  constructor(private readonly updateTicketTypeService: UpdateTicketTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
    @ApiBearerAuth('access-token')

  @ApiOperation({ summary: 'Update an existing ticket type' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ticket type updated successfully', type: UpdateTicketTypeResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('file'))
  async updateTicketType(
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const userId = req.user.email;

      if (file) {
        updateTicketTypeDto.img = file;
      }
      const result = await this.updateTicketTypeService.updateTicketType(updateTicketTypeDto, id, userId);
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