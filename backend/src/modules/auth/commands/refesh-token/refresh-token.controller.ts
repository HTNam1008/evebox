import { Controller, Post, Body, HttpStatus, HttpException, Res } from '@nestjs/common';
import { Response } from 'express';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenCommand } from './refresh-token.command';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';

@Controller('api/user')
@ApiTags('Authentication')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token refreshed successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired refresh token',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Missing refresh token',
  })
  async refreshToken(@Body('refresh_token') refreshToken: string, @Res() res: Response) {
    try {
      if (!refreshToken) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(ErrorHandler.badRequest('Missing refresh token'));
      }

      const command = new RefreshTokenCommand(refreshToken);
      const result = await this.refreshTokenService.execute(command);
      
      if (result.isErr()) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(ErrorHandler.unauthorized(result.unwrapErr().message));
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Token refreshed successfully',
        data: result.unwrap()
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ErrorHandler.internalServerError('Failed to refresh token'));
    }
  }
}
