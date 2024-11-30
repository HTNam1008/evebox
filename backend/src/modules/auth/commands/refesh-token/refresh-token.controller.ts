import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenCommand } from './refresh-token.command';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    const command = new RefreshTokenCommand(refreshToken);
    const result = await this.refreshTokenService.execute(command);
    
    if (result.isErr()) {
      throw new HttpException(result.unwrapErr().message, HttpStatus.UNAUTHORIZED);
    }

    const data = result.unwrap();
    return {
      statusCode: HttpStatus.OK,
      message: 'Token refreshed successfully',
      data: {
        ...data
      },
    };
  }
}
