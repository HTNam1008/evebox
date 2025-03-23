import { Controller, Patch, Request, Res, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateShowingService } from './updateShowing.service';
import { UpdateShowingDto } from './updateShowing.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { UpdateShowingResponseDto } from './updateShowing-response.dto';

@ApiTags('Showing')
@Controller('api/showing')
export class UpdateShowingController {
  constructor(private readonly updateShowingService: UpdateShowingService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update an existing showing' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Showing updated successfully', type: UpdateShowingResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async updateShowing(
    @Body() updateShowingDto: UpdateShowingDto,
    @Request() req,
    @Res() res: Response,
  ) {
    try {
      // If the id is not provided in the body, get it from the URL parameter
      if (!updateShowingDto.id && req.params.id) {
        updateShowingDto.id = req.params.id;
      }
      const result = await this.updateShowingService.updateShowing(updateShowingDto);
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Showing updated successfully',
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