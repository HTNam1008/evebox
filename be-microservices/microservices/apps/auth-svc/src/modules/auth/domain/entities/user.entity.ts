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
import { UserCreatedDomainEvent } from '../events/user/user-created.domain-event';
import { Status } from '../value-objects/user/status.vo';
import { UserStatus } from '@prisma/client';

interface UserProps {
  id: UserId;
  name: Name;
  email: Email;
  password: Password;
  phone: Phone;
  role: Role;
  provinceIds: ProvinceId[]; // ─Éß╗ïnh ngh─⌐a provinceIds l├á mß╗Öt mß║úng ProvinceId
  avatar_id?: Avatar;
  status: Status;
  createAt?: Date;
}

export class User extends AggregateRoot<UserId, UserProps> {
  private constructor(id: UserId, props: UserProps) {
    super(id, props);
  }

  /**
   * Ph╞░╞íng thß╗⌐c tß║ío ng╞░ß╗¥i d├╣ng mß╗¢i vß╗¢i danh s├ích ProvinceIds
   */
  public static async createNew(
    name: Name,
    email: Email,
    password: Password,
    phone: Phone,
    provinceIds: ProvinceId[], // Nhß║¡n danh s├ích ProvinceIds
    role: UserRole = UserRole.CUSTOMER,
    status: Status = Status.create(UserStatus.ACTIVE).unwrap(), // Mß║╖c ─æß╗ïnh l├á ACTIVE
  ): Promise<Result<User, Error>> {
    // Kiß╗âm tra Role
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
        status,
        phone,
        role: roleVo,
        provinceIds, // G├ín danh s├ích ProvinceIds
      });

      user.addDomainEvent(new UserRegisteredDomainEvent(user));
      user.addDomainEvent(new UserCreatedDomainEvent(user.id.value, user.name.value, user.email.value, user.status, user.role.getValue()))
      return Ok(user);
    } catch (error) {
      return Err(new Error('Failed to create user: ' + (error as Error).message));
    }
  }

  /**
   * Ph╞░╞íng thß╗⌐c tß║ío ng╞░ß╗¥i d├╣ng tß╗½ dß╗» liß╗çu persistence (tß╗½ database)
   */
  public static createExisting(
    id: UserId,
    name: Name,
    email: Email,
    password: Password,
    phone: Phone,
    role: Role,
    provinceIds: ProvinceId[], // Nhß║¡n danh s├ích ProvinceIds
    avatarId?: Avatar,
    status?: Status,
    createAt?: Date,
  ): Result<User, Error> {
    return Ok(new User(id, {
      id,
      name,
      email,
      password, 
      status,
      phone,
      role,
      provinceIds, // G├ín danh s├ích ProvinceIds
      avatar_id: avatarId,
      createAt,
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

  // C├íc getter
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

  public get status(): Status {
    return this.props.status;
  }

  public get provinceIds(): ProvinceId[] {
    return this.props.provinceIds;
  }

  public get avatarId(): number | undefined {
    return this.props.avatar_id.value;
  }

  public get createAt(): Date | undefined {
    return this.props.createAt;
  }

  /**
   * V├¡ dß╗Ñ: Ph╞░╞íng thß╗⌐c ─æß╗â th├¬m mß╗Öt ProvinceId v├áo user
   */
  public addProvince(provinceId: ProvinceId): void {
    this.props.provinceIds.push(provinceId);
    // Bß║ín c├│ thß╗â ph├ít sinh th├¬m domain event nß║┐u cß║ºn
  }

  /**
   * V├¡ dß╗Ñ: Ph╞░╞íng thß╗⌐c ─æß╗â loß║íi bß╗Å mß╗Öt ProvinceId khß╗Åi user
   */
  // public removeProvince(provinceId: ProvinceId): void {
  //   this.props.provinceIds = this.props.provinceIds.filter(id => id.value !== provinceId.value);
  //   // Bß║ín c├│ thß╗â ph├ít sinh th├¬m domain event nß║┐u cß║ºn
  // }
}
