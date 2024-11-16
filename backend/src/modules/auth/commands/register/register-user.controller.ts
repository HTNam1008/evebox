// register-user.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { RegisterUserService } from './register-user.service';
import { RegisterUserCommand } from './register-user.command';
import { Response } from 'express';

@Controller('/api/user')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    const command = new RegisterUserCommand(
      registerUserDto.name,
      registerUserDto.email,
      registerUserDto.password,
      registerUserDto.phone,
      registerUserDto.role_id,
      registerUserDto.province_id,
    );

    const result = await this.registerUserService.execute(command);

    if (result.isErr()) {
      return res.status(400).json({ error: result.unwrapErr().message });
    }

    return res.status(201).json({ id: result.unwrap() });
  }
}
