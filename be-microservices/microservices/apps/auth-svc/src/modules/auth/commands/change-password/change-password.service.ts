import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { ChangePasswordCommand } from './change-password.command';
import { Password } from '../../domain/value-objects/user/password.vo';
import { UserId } from '../../domain/value-objects/user/user-id.vo';
import { USER_MESSAGES } from 'src/shared/constants/constants';
import { Email } from '../../domain/value-objects/user/email.vo';

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly userRepository: UserRepositoryImpl,
  ) {}

  async execute(
    command: ChangePasswordCommand,
  ): Promise<Result<void, Error>> {
    try {
        console.log('Starting password change process for user:', command.userEmail);
      // Validate password match
      if (command.newPassword !== command.confirmPassword) {
        return Err(new Error(USER_MESSAGES.ERRORS.PASSWORDS_MISMATCH));
      }

      // Create user ID value object
      const userEmailOrError = Email.create(command.userEmail);
      if (userEmailOrError.isErr()) {
        return Err(userEmailOrError.unwrapErr());
      }
      const userEmailVo = userEmailOrError.unwrap();

      // Find user by ID
      const user = await this.userRepository.findByEmail(userEmailVo);
      if (!user) {
        return Err(new Error(USER_MESSAGES.ERRORS.USER_NOT_FOUND));
      }

      // Verify old password
      const isOldPasswordValid = await user.password.comparePassword(command.oldPassword);
      if (!isOldPasswordValid) {
        return Err(new Error(USER_MESSAGES.ERRORS.INVALID_OLD_PASSWORD));
      }

      // Create new password value object
      const passwordOrError = await Password.create(command.newPassword);
      if (passwordOrError.isErr()) {
        return Err(passwordOrError.unwrapErr());
      }
      const newPassword = passwordOrError.unwrap();

      console.log('after update password');
      // Update user's password
      user.updatePassword(newPassword);

      console.log('User password updated successfully:', user.id.value);

      // Save updated user
      await this.userRepository.save(user);

      // Revoke all refresh tokens for security
      await this.userRepository.revokeAllRefreshTokens(user.email.value);

      return Ok(void 0);
    } catch (error) {
      return Err(new Error(USER_MESSAGES.ERRORS.CHANGE_PASSWORD_FAILED));
    }
  }
}