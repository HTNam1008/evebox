import { Injectable } from '@nestjs/common';
import { RegisterUserCommand } from './register-user.command';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { Name } from '../../domain/value-objects/name.vo';
import { Phone } from '../../domain/value-objects/phone.vo';
import { ProvinceId } from '../../domain/value-objects/province-id.vo';
import { UserRole } from '../../domain/enums/user-role.enum';
import { Role } from '../../domain/value-objects/role.vo';
import { Result, Ok, Err } from 'oxide.ts';
import { AuthRepositoryImpl } from '../../repositories/auth.repository.impl';

@Injectable()
export class RegisterUserService {
  constructor(private readonly authRepository: AuthRepositoryImpl) {}

  async execute(command: RegisterUserCommand): Promise<Result<string, Error>> {
    try {
      const emailOrError = Email.create(command.email);
      if (emailOrError.isErr()) {
        return Err(emailOrError.unwrapErr());
      }
      const email = emailOrError.unwrap();

      const existingUser = await this.authRepository.findByEmail(email);
      if (existingUser) {
        return Err(new Error('User with this email already exists'));
      }

      const nameOrError = Name.create(command.name);
      if (nameOrError.isErr()) {
        return Err(nameOrError.unwrapErr());
      }
      const name = nameOrError.unwrap();

      const phoneOrError = Phone.create(command.phone);
      if (phoneOrError.isErr()) {
        return Err(phoneOrError.unwrapErr());
      }
      const phone = phoneOrError.unwrap();

      const provinceIdsOrError = ProvinceId.createList(command.province_id);
      if (provinceIdsOrError.isErr()) {
        return Err(provinceIdsOrError.unwrapErr());
      }
      const provinceIds = provinceIdsOrError.unwrap();
      console.log("provinceIds: ", provinceIds);

      const roleOrError = Role.create(command.role_id ? command.role_id : UserRole.CUSTOMER);
      if (roleOrError.isErr()) {
        return Err(roleOrError.unwrapErr());
      }
      const role = roleOrError.unwrap();

      const passwordOrError = await Password.create(command.password);
      if (passwordOrError.isErr()) {
        return Err(passwordOrError.unwrapErr()); 
      }
      const password = passwordOrError.unwrap();

      const userOrError = await User.createNew(
        name,
        email,
        password,
        phone,
        provinceIds,
        role.getValue(), 
      );

      if (userOrError.isErr()) {
        return Err(userOrError.unwrapErr());
      }

      const user = userOrError.unwrap(); 

      await this.authRepository.save(user);

      return Ok(user.id.value);
    } catch (error) {
      console.error('Error during registration:', error);
      return Err(new Error('An unexpected error occurred during registration.'));
    }
  }
}
