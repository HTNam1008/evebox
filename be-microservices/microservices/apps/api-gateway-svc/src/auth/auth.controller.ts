import { Controller, Post, Body, Res, UseGuards, Request, Get, Headers } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FastifyReply } from 'fastify';
import { firstValueFrom } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { convertToSafeHeaders } from 'src/common/utils/auth.uitls';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordUserDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyOTPDto } from './dto/verify-otp.dto';
import { ResendOTPDto } from './dto/resend-otp.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('api/user')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto, @Res() res: FastifyReply) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/login`,
          loginDto,
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterUserDto,
    @Res() res: FastifyReply,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/register`,
          registerDto,
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      // Forward nguyên bản response từ auth-service
      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      const statusCode = error.response?.status || 500;
      const errorData = error.response?.data || {
        message: 'Internal server error',
        error: 'GatewayError',
        statusCode: 500,
      };

      return res
        .status(statusCode)
        .headers(error.response?.headers || {})
        .send(errorData);
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto, @Res() res: FastifyReply) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/refresh-token`,
          body,
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: FastifyReply) {
    console.log('[Auth Controller] Forwarding request to AUTH_SERVICE_URL');

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/logout`,
          {
            email: req.user.email,
            role_id: req.user.role,
          },
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() body: ForgotPasswordUserDto,
    @Res() res: FastifyReply,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/forgot-password`,
          body,
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
    @Res() res: FastifyReply,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/reset-password`,
          body,
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @Post('otps/verify-otp')
  async verifyOtp(@Body() body: VerifyOTPDto, @Res() res: FastifyReply) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/otps/verify-otp`,
          body,
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @Post('otps/resend-otp')
  async resendOtp(@Body() body: ResendOTPDto, @Res() res: FastifyReply) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/otps/resend-otp`,
          body,
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @Get('google')
  async googleLogin(@Body() body: GoogleLoginDto, @Res() res: FastifyReply) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/user/google`,
          body,
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req, @Res() res: FastifyReply, @Headers() headers: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.AUTH_SERVICE_URL}/api/user/me`,
          {
            headers: {
              ...headers,
              'X-User-Email': req.user.email,
              'X-User-Role': req.user.role,
            },
          }
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }
}
