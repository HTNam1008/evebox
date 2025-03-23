import { Controller, Delete, Request, Res, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteShowingService } from './deleteShowing.service';
import { DeleteShowingDto } from './deleteShowing.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { DeleteShowingResponseDto } from './deleteShowing-response.dto';

@ApiTags('Showing')
@Controller('api/showing')
export class DeleteShowingController {
  constructor(private readonly deleteShowingService: DeleteShowingService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a showing' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Showing deleted successfully', type: DeleteShowingResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async deleteShowing(
    @Body() deleteShowingDto: DeleteShowingDto,
    @Request() req,
    @Res() res: Response,
  ) {
    try {
      // If the ID is not provided in the body, use the URL parameter
      if (!deleteShowingDto.id && req.params.id) {
        deleteShowingDto.id = req.params.id;
      }
      const result = await this.deleteShowingService.execute(deleteShowingDto);
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Showing deleted successfully',
        data: { showingId: result.unwrap() },
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