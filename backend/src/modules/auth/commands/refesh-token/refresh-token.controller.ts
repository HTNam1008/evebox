// src/modules/auth/commands/refresh-token/refresh-token.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenCommand } from './refresh-token.command';

@Controller('api/user')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const command = new RefreshTokenCommand(refreshToken);
    const result = await this.refreshTokenService.execute(command);
    return result;
  }
}
