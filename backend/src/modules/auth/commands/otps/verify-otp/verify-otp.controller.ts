import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { VerifyOTPCommand } from './verify-otp.command';
import { VerifyOTPService } from './verify-otp.service';
import { VerifyOTPDto } from './verify-otp.dto';
import { OTPType } from 'src/modules/auth/domain/enums/otp-type.enum';

@Controller('api/user/otps')
@ApiTags('Authentication')
export class VerifyOTPController {
  constructor(
    private readonly verifyOTPService: VerifyOTPService,
  ) {}

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP verified successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid OTP or email',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async verifyOTP(@Body() dto: VerifyOTPDto) {
    const command = new VerifyOTPCommand(dto.email, dto.otp, dto.type, dto.request_token);  
    const result = await this.verifyOTPService.execute(command);

    if (result.isErr()) {
      const error = result.unwrapErr();
      
      if (error.message === 'User not found') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      
      if (error.message === 'Email already registered') {
        throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
      }
      
      if (error.message === 'Invalid or expired OTP') {
        throw new HttpException('Invalid or expired OTP', HttpStatus.BAD_REQUEST);
      }
      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const data = result.unwrap();
    const responseMessage = command.type === OTPType.FORGOT_PASSWORD
      ? 'You can now reset your password'
      : 'Email verified successfully. You can now complete registration';
    const token = command.type === OTPType.FORGOT_PASSWORD ? data : null;
    return {
      statusCode: HttpStatus.OK,
      message: responseMessage,
      data: {
        token: token,
      },
    };
  }
}