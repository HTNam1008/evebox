import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { Email } from '../../domain/value-objects/user/email.vo';
import { Err, Ok, Result } from 'oxide.ts';

@Injectable()
export class GetUserService {
  constructor(
    private readonly userRepository: UserRepositoryImpl,
  ) {}
 
  async execute(email: string): Promise<Result<{
    id: string, name: string, email: string, role: number, phone: string, avatar_id?: number
  }, Error>> {
    const emailOrError = Email.create(email);
    if (emailOrError.isErr()) {
      return Err(emailOrError.unwrapErr());
    }

    const user = await this.userRepository.findByEmail(emailOrError.unwrap());
    console.log("user:", user);
    if (user != null) {
      return Ok({
        id: user.id.value, 
        name: user.name.value, 
        email: user.email.value,
        role: user.role.getValue(), 
        phone: user.phone.value,
        avatar_id: user.avatarId,
      });
    }
  }
}
