import { Controller, Delete, Request, Res, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteTicketTypeService } from './deleteTicketType.service';
import { DeleteTicketTypeDto } from './deleteTicketType.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { DeleteTicketTypeResponseDto } from './deleteTicketType-response.dto';

@ApiTags('TicketType')
@Controller('api/ticketType')
export class DeleteTicketTypeController {
  constructor(private readonly deleteTicketTypeService: DeleteTicketTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a ticket type' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ticket type deleted successfully', type: DeleteTicketTypeResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async deleteTicketType(
    @Body() deleteTicketTypeDto: DeleteTicketTypeDto,
    @Request() req,
    @Res() res: Response,
  ) {
    try {
      // If the ID is not provided in the body, use the URL parameter
      if (!deleteTicketTypeDto.id && req.params.id) {
        deleteTicketTypeDto.id = req.params.id;
      }
      const result = await this.deleteTicketTypeService.execute(deleteTicketTypeDto);
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Ticket type deleted successfully',
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