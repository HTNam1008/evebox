import { AdminUser } from '@prisma/client';
import { IUserCreatedEvent } from '../domain/events/consumer/user/user-created.event';

export interface AdminRepository {
  createUser(event: IUserCreatedEvent): Promise<void>;
  getUsers(): Promise<AdminUser[]>;
  updateUserStatus(userId: string, status: string): Promise<void>;
}
