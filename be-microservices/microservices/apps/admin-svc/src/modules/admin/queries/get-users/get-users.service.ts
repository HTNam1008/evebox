import { Injectable } from '@nestjs/common';
import { AdminRepositoryImpl } from '../../repositories/admin.repository.impl';
import { Err, Ok, Result } from 'oxide.ts';
import { AdminUser } from '@prisma/client';

@Injectable()
export class GetUsersService {
  constructor(
    private readonly userRepository: AdminRepositoryImpl,
  ) {}
 
  async execute(page: number, pageSize: number): Promise<Result<{ users: AdminUser[]; total: number }, Error>> {
    try {
      const { users, total } = await this.userRepository.getUsersPaginated(page, pageSize);
      return Ok({ users, total });
    } catch (error) {
      return Err(new Error('Failed to get users'));
    }
  }
}
