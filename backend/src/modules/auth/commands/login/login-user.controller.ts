// authenticate-user.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { LoginUserDto } from './login-user.dto';
import { LoginUserService } from './login-user.service';
import { Response } from 'express';
import { LoginUserCommand } from './login-user.command';

@Controller('api/user')
export class LoginUserController {
  constructor(
    private readonly loginUserService: LoginUserService,
  ) {}

  @Post('login')
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
      return res.status(401).json({ error: result.unwrapErr().message });
    }

    return res.status(200).json(result.unwrap());
  }
}
