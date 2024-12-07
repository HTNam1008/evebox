import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { LoginUserDto } from './login-user.dto';
import { LoginUserService } from './login-user.service';
import { Response } from 'express';
import { LoginUserCommand } from './login-user.command';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';

@Controller('api/user')
@ApiTags('Authentication')
export class LoginUserController {
  constructor(
    private readonly loginUserService: LoginUserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
  ) { 
    const command = new LoginUserCommand(
      loginUserDto.email,
      loginUserDto.password,
    );

    const result = await this.loginUserService.execute(command);

    if (result.isErr()) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(ErrorHandler.badRequest(result.unwrapErr().message));
    }

    const data = result.unwrap();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: {
        ...data
      },
    });
  }
}
