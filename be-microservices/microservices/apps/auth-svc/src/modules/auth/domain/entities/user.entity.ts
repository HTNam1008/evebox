import { AggregateRoot } from 'src/libs/ddd/aggregate-root.base';
import { UserId } from '../value-objects/user/user-id.vo';
import { Email } from '../value-objects/user/email.vo';
import { Password } from '../value-objects/user/password.vo';
import { UserRole } from '../enums/user-role.enum';
import { Role } from '../value-objects/user/role.vo';
import { UserRegisteredDomainEvent } from '../events/user/user-registered.domain-event';
import { Name } from '../value-objects/user/name.vo';
import { Phone } from '../value-objects/user/phone.vo';
import { ProvinceId } from '../value-objects/user/province-id.vo';
import { Result, Ok, Err } from 'oxide.ts';
import { UserPasswordResetDomainEvent } from '../events/user/user-reset-password.domain-event';
import { Avatar } from '../value-objects/user/avatar.vo';

interface UserProps {
  id: UserId;
  name: Name;
  email: Email;
  password: Password;
  phone: Phone;
  role: Role;
  provinceIds: ProvinceId[]; // Định nghĩa provinceIds là một mảng ProvinceId
  avatar_id?: Avatar;
}

export class User extends AggregateRoot<UserId, UserProps> {
  private constructor(id: UserId, props: UserProps) {
    super(id, props);
  }

  /**
   * Phương thức tạo người dùng mới với danh sách ProvinceIds
   */
  public static async createNew(
    name: Name,
    email: Email,
    password: Password,
    phone: Phone,
    provinceIds: ProvinceId[], // Nhận danh sách ProvinceIds
    role: UserRole = UserRole.CUSTOMER,
  ): Promise<Result<User, Error>> {
    // Kiểm tra Role
    const roleOrError = Role.create(role);
    if (roleOrError.isErr()) {
      return Err(roleOrError.unwrapErr());
    }
    const roleVo = roleOrError.unwrap();

    try {
      const id = UserId.generate();
      const user = new User(id, {
        id,
        name,
        email,
        password,
        phone,
        role: roleVo,
        provinceIds, // Gán danh sách ProvinceIds
      });

      user.addDomainEvent(new UserRegisteredDomainEvent(user));

      return Ok(user);
    } catch (error) {
      return Err(new Error('Failed to create user: ' + (error as Error).message));
    }
  }

  /**
   * Phương thức tạo người dùng từ dữ liệu persistence (từ database)
   */
  public static createExisting(
    id: UserId,
    name: Name,
    email: Email,
    password: Password,
    phone: Phone,
    role: Role,
    provinceIds: ProvinceId[], // Nhận danh sách ProvinceIds
    avatarId?: Avatar,
  ): Result<User, Error> {
    return Ok(new User(id, {
      id,
      name,
      email,
      password, 
      phone,
      role,
      provinceIds, // Gán danh sách ProvinceIds
      avatar_id: avatarId,
    }));
  }
  
  public updatePassword(newPassword: Password): void {
    this.props.password = newPassword;
    
    // Add domain event
    this.addDomainEvent(
      new UserPasswordResetDomainEvent(this)
    );
  }

  public updateName(name: Name): void {
    this.props.name = name;
  }

  public updatePhone(phone: Phone): void {
    this.props.phone = phone;
  }

  public updateAvatarId(avatarId: Avatar): void {
    this.props.avatar_id = avatarId;
  }

  // Các getter
  public get name(): Name {
    return this.props.name;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get password(): Password {
    return this.props.password;
  }

  public get phone(): Phone {
    return this.props.phone;
  }

  public get role(): Role {
    return this.props.role;
  }

  public get provinceIds(): ProvinceId[] {
    return this.props.provinceIds;
  }

  public get avatarId(): number | undefined {
    return this.props.avatar_id.value;
  }

  /**
   * Ví dụ: Phương thức để thêm một ProvinceId vào user
   */
  public addProvince(provinceId: ProvinceId): void {
    this.props.provinceIds.push(provinceId);
    // Bạn có thể phát sinh thêm domain event nếu cần
  }

  /**
   * Ví dụ: Phương thức để loại bỏ một ProvinceId khỏi user
   */
  // public removeProvince(provinceId: ProvinceId): void {
  //   this.props.provinceIds = this.props.provinceIds.filter(id => id.value !== provinceId.value);
  //   // Bạn có thể phát sinh thêm domain event nếu cần
  // }
}
