// login-user.service.ts

import { Injectable } from '@nestjs/common';
import { LoginUserCommand } from './login-user.command';
import { JwtService } from '@nestjs/jwt';
import { Result, Ok, Err } from 'oxide.ts';
import { Email } from '../../domain/value-objects/email.vo';
import { AuthRepositoryImpl } from '../../repositories/auth.repository.impl';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginUserService {
  constructor(
    private readonly userRepository: AuthRepositoryImpl,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async execute(
    command: LoginUserCommand,
  ): Promise<Result<{ accessToken: string, refreshToken: string }, Error>> {
    const emailOrError = Email.create(command.email);
    if (emailOrError.isErr()) {
      return Err(emailOrError.unwrapErr());
    }
    const email = emailOrError.unwrap();

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return Err(new Error('Invalid credentials'));
    }

    const passwordMatches = await user.password.comparePassword(command.password);
    if (!passwordMatches) {
      return Err(new Error('Invalid credentials'));
    }

    // Generate Access Token
    const payload = { email: user.email.value, role: user.role.getValue()};
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'), // Access token expires in 1 minute
    });

    // Generate Refresh Token
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'), // Refresh token expires in 7 days
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    
    await this.userRepository.saveRefreshToken(
      refreshToken,
      user.email.value,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // expiresAt
    );

    return Ok({ accessToken, refreshToken });
  }
}
