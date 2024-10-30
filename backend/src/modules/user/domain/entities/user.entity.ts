// src/modules/user/domain/entities/user.entity.ts

import { AggregateRoot } from 'src/libs/ddd/aggregate-root.base';
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { UserRole } from '../enums/user-role.enum';
import { Role } from '../value-objects/role.vo';

interface UserProps {
  email: Email;
  password: Password;
  role: Role;
}

export class User extends AggregateRoot<UserId, UserProps> {
  private constructor(id: UserId, props: UserProps) {
    super(id, props);
  }

  // Phương thức tạo người dùng mới
  public static async createNew(
    email: Email,
    password: Password,
    role: UserRole = UserRole.CUSTOMER,
  ): Promise<User> {
    const id = UserId.generate();
    const roleVo = Role.create(role);
    const user = new User(id, {
      email,
      password,
      role: roleVo,
    });
    // Có thể phát sinh domain event tại đây
    return user;
  }

  // Phương thức tạo người dùng từ dữ liệu persistence
  public static createExisting(
    id: UserId,
    email: Email,
    password: Password,
    role: Role,
  ): User {
    return new User(id, {
      email,
      password,
      role,
    });
  }

  // Các getter
  public get email(): Email {
    return this.props.email;
  }

  public get password(): Password {
    return this.props.password;
  }

  public get role(): Role {
    return this.props.role;
  }
}
