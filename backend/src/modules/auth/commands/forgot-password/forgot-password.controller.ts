import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation} from '@nestjs/swagger';
import { ForgotPasswordUserCommand } from './forgot-password.command';
import { ForgotPasswordUserService } from './forgot-password.service';
import { ForgotPasswordUserDto } from './forgot-password.dto';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';

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
  async forgotPassword(@Res() res: Response, @Body() forgotPasswordUserDto: ForgotPasswordUserDto) : Promise<Response> {
    const command = new ForgotPasswordUserCommand(forgotPasswordUserDto.email);
    const result = await this.forgotPasswordService.execute(command);

    if (result.isErr()) {
      const error = result.unwrapErr();
      
      if (error.message === 'Invalid credentials') {
        return res
          .status(HttpStatus.OK)
          .json(ErrorHandler.notFound('User not found'));
      }
      
      return res
        .status(HttpStatus.OK)
        .json(ErrorHandler.badRequest(error.message));
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OTP has been sent to your email',
      data: {
        ...result.unwrap(),
      }
    });
  }
}
