import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { Result, Ok, Err } from 'oxide.ts';
import { USER_MESSAGES } from 'src/shared/constants/constants';
import { LogoutUserCommand } from './logout-user.command';

@Injectable()
export class LogoutUserService {
  constructor(
    private readonly userRepository: UserRepositoryImpl,
  ) {}

  async execute(command: LogoutUserCommand): Promise<Result<void, Error>> {
    try {
      // Revoke token if valid
      await this.userRepository.revokeAllRefreshTokens(command.email);
      console.log('Revoke all refresh tokens for user:', command.email);
      
      return Ok(void 0);
    } catch (error) {
      return Err(new Error(USER_MESSAGES.ERRORS.LOGOUT_FAILED(error.message)));
    }
  }
}
