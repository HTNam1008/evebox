import { Controller, Post, Body, HttpStatus, HttpException, Res } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { VerifyOTPCommand } from './verify-otp.command';
import { VerifyOTPService } from './verify-otp.service';
import { VerifyOTPDto } from './verify-otp.dto';
import { OTPType } from 'src/modules/auth/domain/enums/otp-type.enum';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';

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
  async verifyOTP(@Body() dto: VerifyOTPDto, @Res() res: Response) {
    try {
      const command = new VerifyOTPCommand(dto.email, dto.otp, dto.type, dto.request_token);  
      const result = await this.verifyOTPService.execute(command);

      if (result.isErr()) {
        const error = result.unwrapErr();
        
        if (error.message === 'User not found') {
          return res
              .status(HttpStatus.NOT_FOUND)
              .json(ErrorHandler.notFound('User not found'));
        }
        
        if (error.message === 'Email already registered') {
          return res
              .status(HttpStatus.BAD_REQUEST)
              .json(ErrorHandler.badRequest('Email already registered'));
        }
        
        if (error.message === 'Invalid or expired OTP') {
          return res
              .status(HttpStatus.BAD_REQUEST)
              .json(ErrorHandler.badRequest('Invalid or expired OTP'));
        }
        
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json(ErrorHandler.badRequest(error.message));
      }

      const data = result.unwrap();
      const responseMessage = command.type === OTPType.FORGOT_PASSWORD
        ? 'You can now reset your password'
        : 'Email verified successfully. You can now complete registration';
      const token = command.type === OTPType.FORGOT_PASSWORD ? data : null;
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: responseMessage,
        data: {
          token: token,
        },
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ErrorHandler.internalServerError('Failed to verify OTP'));
    }
  } 
}