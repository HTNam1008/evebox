import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IUserChangeStatusEvent } from '../user/user-change-status.event';
import { UserRepositoryImpl } from 'src/modules/auth/repositories/user.repository.impl';

@Controller()
export class UserChangeStatusHandler {
  constructor(private userRepository : UserRepositoryImpl) {}

  @EventPattern('user_change_status')
  async handleUserChangeStatus(@Payload() data: IUserChangeStatusEvent) {
    try {
      Logger.log('Received user change status event:', data);
      await this.userRepository.updateUserStatus(data.userId, data.status);
    } catch (error) {
      Logger.error('Failed to change user status', error);
    }
  }
}