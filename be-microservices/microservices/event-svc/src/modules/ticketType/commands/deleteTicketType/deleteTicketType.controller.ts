import { Controller, Delete, Request, Res, HttpStatus, Body, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteTicketTypeService } from './deleteTicketType.service';
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
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.deleteTicketTypeService.execute(id);
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