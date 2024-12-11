import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { RegisterUserService } from './register-user.service';
import { RegisterUserCommand } from './register-user.command';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';

@Controller('/api/user')
@ApiTags('Authentication')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP sent successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Missing or invalid data',
  })

  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    const command = new RegisterUserCommand(
      registerUserDto.name,
      registerUserDto.email,
      registerUserDto.password,
      registerUserDto.re_password,
      registerUserDto.phone,
      registerUserDto.role_id,
      registerUserDto.province_id,
    );

    const result = await this.registerUserService.execute(command);

    if (result.isErr()) {
      return res.status(200).json(ErrorHandler.badRequest(result.unwrapErr().message));
    }

    return res.status(200).json({ 
      statusCode: HttpStatus.OK,
      message: 'OTP has been sent to your email',
      data: {
        ...result.unwrap(),
      }
    });
  }
}
