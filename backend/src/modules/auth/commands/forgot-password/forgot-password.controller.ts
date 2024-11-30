import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ForgotPasswordUserCommand } from './forgot-password.command';
import { ForgotPasswordUserService } from './forgot-password.service';
import { ForgotPasswordUserDto } from './forgot-password.dto';

@Controller('api/user')
@ApiTags('Authentication')
export class ForgotPasswordController {
  constructor(
    private readonly forgotPasswordService: ForgotPasswordUserService,
  ) {}

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request OTP for password reset' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP sent successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Missing or invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async forgotPassword(@Body() forgotPasswordUserDto: ForgotPasswordUserDto) {
    const command = new ForgotPasswordUserCommand(forgotPasswordUserDto.email);
    const result = await this.forgotPasswordService.execute(command);

    if (result.isErr()) {
      const error = result.unwrapErr();
      
      if (error.message === 'Invalid credentials') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OTP has been sent to your email',
      data: {
        ...result.unwrap(),
      }
    };
  }
}
