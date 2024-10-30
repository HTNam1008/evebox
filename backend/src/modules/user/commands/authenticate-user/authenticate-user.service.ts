// authenticate-user.service.ts

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { AuthenticateUserCommand } from './authenticate-user.command';
import { JwtService } from '@nestjs/jwt';
import { Result, Ok, Err } from 'oxide.ts';
import { Email } from '../../domain/value-objects/email.vo';

@Injectable()
export class AuthenticateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    command: AuthenticateUserCommand,
  ): Promise<Result<{ accessToken: string }, Error>> {
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

    // Tạo JWT token
    const payload = { sub: user.id.value, role: user.role.getValue() };
    const accessToken = this.jwtService.sign(payload);

    return Ok({ accessToken });
  }
}
