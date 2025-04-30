import { Controller, Delete, Request, Res, HttpStatus, Body, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteShowingService } from './deleteShowing.service';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { DeleteShowingResponseDto } from './deleteShowing-response.dto';

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class DeleteShowingController {
  constructor(private readonly deleteShowingService: DeleteShowingService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a showing' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Showing deleted successfully', type: DeleteShowingResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async deleteShowing(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: any,
  ) {
    try {
      if(!id) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Showing id is required',
        });
      }

      const userId = req.user.email;
      
      const result = await this.deleteShowingService.execute(id, userId);
      if (result.isErr()) {
        if(result.unwrapErr().message === 'Showing not found') {
          return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Showing not found',
          });
        }
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