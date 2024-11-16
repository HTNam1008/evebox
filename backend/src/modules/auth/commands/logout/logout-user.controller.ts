import { Controller, Post, Req, Res, UseGuards, UnauthorizedException } from '@nestjs/common';
import { LogoutUserService } from './logout-user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('api/user')
export class LogoutUserController {
  constructor(private readonly logoutService: LogoutUserService) {}

//   @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() request: Request, @Res() response: Response): Promise<Response> {
    try {
      const refreshToken = this.extractTokenFromHeader(request);
      console.log("token: ", refreshToken);
      // Call the service to handle logout
      await this.logoutService.logout(refreshToken);

      // Clear cookies if refresh tokens are stored in cookies
      response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true, // Use in production with HTTPS
        sameSite: 'strict',
      });

      return response.status(200).send({ message: 'Successfully logged out' });
    } catch (error) {
        console.log("error: ", error);
      throw new UnauthorizedException('Unable to logout, invalid token');
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
