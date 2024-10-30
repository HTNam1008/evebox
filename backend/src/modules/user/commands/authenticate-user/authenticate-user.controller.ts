// authenticate-user.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthenticateUserDto } from './authenticate-user.dto';
import { AuthenticateUserService } from './authenticate-user.service';
import { Response } from 'express';
import { AuthenticateUserCommand } from './authenticate-user.command';

@Controller('auth')
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @Post('signin')
  async authenticate(
    @Body() authenticateUserDto: AuthenticateUserDto,
    @Res() res: Response,
  ) {
    const command = new AuthenticateUserCommand(
      authenticateUserDto.email,
      authenticateUserDto.password,
    );

    const result = await this.authenticateUserService.execute(command);

    if (result.isErr()) {
      return res.status(401).json({ error: result.unwrapErr().message });
    }

    return res.status(200).json(result.unwrap());
  }
}
