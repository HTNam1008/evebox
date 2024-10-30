// src/modules/user/commands/register-user/register-user.service.ts

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { RegisterUserCommand } from './register-user.command';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { UserRole } from '../../domain/enums/user-role.enum';
import { Role } from '../../domain/value-objects/role.vo';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class RegisterUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    command: RegisterUserCommand,
  ): Promise<Result<string, Error>> {
    const emailOrError = Email.create(command.email);
    if (emailOrError.isErr()) {
      return Err(emailOrError.unwrapErr());
    }
    const email = emailOrError.unwrap();

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return Err(new Error('User with this email already exists'));
    }

    const roleValue = command.role ? command.role : UserRole.CUSTOMER;
    const role = Role.create(roleValue);

    const password = await Password.create(command.password);

    const user = await User.createNew(email, password, role.getValue());

    await this.userRepository.save(user);

    return Ok(user.id.value);
  }
}
