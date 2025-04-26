import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IUserCreatedEvent } from '../user/user-created.event';
import { AdminRepositoryImpl } from 'src/modules/admin/repositories/admin.repository.impl';

@Controller()
export class UserCreatedHandler {
  constructor(private adminRepository : AdminRepositoryImpl) {}

  @EventPattern('user_created')
  async handleUserRegistered(@Payload() data: IUserCreatedEvent) {
    try {
      Logger.log('Received user created event:', data);
      await this.adminRepository.createUser(data);
    } catch (error) {
      Logger.error('Failed to create new user', error);
    }
  }
}