import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { Err, Ok, Result } from 'oxide.ts';
import { UserId } from '../../domain/value-objects/user/user-id.vo';

@Injectable()
export class GetUserByIdService {
  constructor(
    private readonly userRepository: UserRepositoryImpl,
  ) {}
 
  async execute(id: string): Promise<Result<{
    id: string, name: string, email: string, role: number, phone: string, avatar_id?: number, createAt: Date, status: string
  }, Error>> {
    const idOrError = UserId.create(id);
    if (idOrError.isErr()) {
      return Err(idOrError.unwrapErr());
    }

    const user = await this.userRepository.findById(idOrError.unwrap());
    if (user != null) {
      return Ok({
        id: user.id.value, 
        name: user.name.value, 
        email: user.email.value,
        role: user.role.getValue(), 
        phone: user.phone.value,
        avatar_id: user.avatarId,
        createAt: user.createAt,
        status: user.status.getValue(),
      });
    }
  }
}
