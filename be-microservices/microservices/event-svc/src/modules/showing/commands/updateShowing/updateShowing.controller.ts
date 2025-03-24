import { Controller, Patch, Request, Res, HttpStatus, Body, UseGuards, Param, Put, Query } from '@nestjs/common';
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
  @Put('update/:id')
  @ApiOperation({ summary: 'Update an existing showing' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Showing updated successfully', type: UpdateShowingResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async updateShowing(
    @Body() updateShowingDto: UpdateShowingDto,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      if(!id) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Showing id is required',
        });
      }
      console.log(updateShowingDto);
      const result = await this.updateShowingService.updateShowing(updateShowingDto, id);
      if (result.isErr()) {
        if (result.unwrapErr().message === 'Showing not found') {
          return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: result.unwrapErr().message,
          });
        }
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