import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResendOTPDto } from './resend-otp.dto';
import { ResendOTPService } from './resend-otp.service';
import { ResendOTPCommand } from './resend-otp.command';

@Controller('api/user/otps')
@ApiTags('Authentication')
export class ResendOTPController {
  constructor(private readonly resendOTPService: ResendOTPService) {}

  @Post('resend-otp')
  @ApiOperation({ summary: 'Resend OTP code' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP resent successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email or cooldown period not elapsed',
  })
  async resendOTP(@Body() dto: ResendOTPDto) {
    const command = new ResendOTPCommand(
      dto.email, 
      dto.type,
      dto.request_token
    );
    
    const result = await this.resendOTPService.execute(command);

    if (result.isErr()) {
      throw new HttpException(result.unwrapErr().message, HttpStatus.BAD_REQUEST);
    }

    const data = result.unwrap();
    return {
      statusCode: HttpStatus.OK,
      message: 'OTP resent successfully',
      data: {
        remaining_attempts: data.remaining_attempts,
        resend_allowed_in: data.resend_allowed_in
      },
    };
  }
}