import { Controller, Post, Req, Res, UseGuards, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { LogoutUserService } from './logout-user.service';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('Authentication')
export class LogoutUserController {
  constructor(private readonly logoutService: LogoutUserService) {}

//   @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged out successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or missing token',
  })
  async logout(@Req() request: Request) {
    try {
      const refreshToken = this.extractTokenFromHeader(request);
      console.log("token: ", refreshToken);
      // Call the service to handle logout
      await this.logoutService.logout(refreshToken);

      // Clear cookies if refresh tokens are stored in cookies
      // response.clearCookie('refreshToken', {
      //   httpOnly: true,
      //   secure: true, // Use in production with HTTPS
      //   sameSite: 'strict',
      // });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully logged out',
        data: null
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Unable to logout', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private extractTokenFromHeader(request: Request): string {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }
    return token;
  }
}
