// register-user.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { RegisterUserService } from './register-user.service';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { Response } from 'express';

@Controller('auth')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @Post('signup')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    const command = new RegisterUserCommand(
      registerUserDto.email,
      registerUserDto.password,
      registerUserDto.role,
    );

    const result = await this.registerUserService.execute(command);

    if (result.isErr()) {
      return res.status(400).json({ error: result.unwrapErr().message });
    }

    return res.status(201).json({ id: result.unwrap() });
  }
}
