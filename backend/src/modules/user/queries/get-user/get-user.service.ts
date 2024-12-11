import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/user.repository';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';

import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserService {
  constructor(
    private readonly userRepository: UserRepositoryImpl, // This is the dependency in question
  ) {}

  async getCurrentUser(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
