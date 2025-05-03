import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { AdminRepositoryImpl } from '../../repositories/admin.repository.impl';
import { USER_MESSAGES } from 'src/shared/constants/constants';
import { UserStatusCommand } from './user-status.command';

@Injectable()
export class UserStatusService {
  constructor(private readonly adminRepository: AdminRepositoryImpl) {}

  async execute(data: UserStatusCommand): Promise<Result<void, Error>> {
    try {
      await this.adminRepository.updateUserStatus(data.userId, data.status);

      return Ok(void 0);
    } catch (error) {
      return Err(new Error(USER_MESSAGES.ERRORS.SERVER_ERROR));
    }
  }
}
