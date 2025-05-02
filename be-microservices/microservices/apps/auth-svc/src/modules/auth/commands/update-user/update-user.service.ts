import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { UpdateUserCommand } from './update-user.command';
import { USER_MESSAGES } from 'src/shared/constants/constants';
import { Email } from '../../domain/value-objects/user/email.vo';
import { Name } from '../../domain/value-objects/user/name.vo';
import { Phone } from '../../domain/value-objects/user/phone.vo';
import { CacheService } from '@evebox/redis';
import { Avatar } from '../../domain/value-objects/user/avatar.vo';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly userRepository: UserRepositoryImpl,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: UpdateUserCommand): Promise<Result<void, Error>> {
    try {
      const emailOrError = Email.create(command.email);
      if (emailOrError.isErr()) {
        return Err(emailOrError.unwrapErr());
      }
      const email = emailOrError.unwrap();

      const user = await this.userRepository.findByEmail(email);
      if (user == null) {
        return Err(new Error(USER_MESSAGES.ERRORS.USER_NOT_FOUND));
      }
  
      if (command.name != null) {
        const nameOrError = Name.create(command.name);
        if (nameOrError.isErr()) {
          return Err(nameOrError.unwrapErr());
        }
        const name = nameOrError.unwrap();
        user.updateName(name);
      }

      if (command.phone != null) {
        const phoneOrError = Phone.create(command.phone);
        if (phoneOrError.isErr()) {
          return Err(phoneOrError.unwrapErr());
        }
        const phone = phoneOrError.unwrap();
        user.updatePhone(phone);
      }

      if (command.avatar_id != null) {
         const avatarIdOrError = Avatar.create(command.avatar_id);
          if (avatarIdOrError.isErr()) {
            return Err(avatarIdOrError.unwrapErr());
          }
          const avatarId = avatarIdOrError.unwrap();
          user.updateAvatarId(avatarId);
      }

      await this.userRepository.updateUserInfo(user);

      await this.cacheService.del(`user:${email}`);
      await this.cacheService.set(
        `user:${email}`, 
        JSON.stringify(user),
        3600,
      );

      return Ok(void 0);
    } catch (error) {
      return Err(new Error(USER_MESSAGES.ERRORS.SERVER_ERROR));
    }
  }
}
