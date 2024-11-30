import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ResetPasswordCommand } from './reset-password.command';
import { ResetPasswordService } from './reset-password.service';

@Controller('api/user')
@ApiTags('Authentication')
export class ResetPasswordController {
  constructor(
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using reset token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or reset token',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async resetPassword(@Body() command: ResetPasswordCommand) {
    const result = await this.resetPasswordService.execute(command);

    if (result.isErr()) {
      const error = result.unwrapErr();
      
      if (error.message === 'User not found') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      
      if (error.message === 'Passwords do not match') {
        throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
      }
      
      if (error.message === 'Invalid reset token') {
        throw new HttpException('Invalid reset token', HttpStatus.BAD_REQUEST);
      }
      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Password has been reset successfully',
    };
  }
}