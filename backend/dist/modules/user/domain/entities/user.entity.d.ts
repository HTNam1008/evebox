import { AggregateRoot } from 'src/libs/ddd/aggregate-root.base';
import { UserId } from '../value-objects/user/user-id.vo';
import { Email } from '../value-objects/user/email.vo';
import { Password } from '../value-objects/user/password.vo';
import { UserRole } from '../enums/user-role.enum';
import { Role } from '../value-objects/user/role.vo';
import { Name } from '../value-objects/user/name.vo';
import { Phone } from '../value-objects/user/phone.vo';
import { ProvinceId } from '../value-objects/user/province-id.vo';
import { Result } from 'oxide.ts';
interface UserProps {
    id: UserId;
    name: Name;
    email: Email;
    password: Password;
    phone: Phone;
    role: Role;
    provinceIds: ProvinceId[];
}
export declare class User extends AggregateRoot<UserId, UserProps> {
    private constructor();
    static createNew(name: Name, email: Email, password: Password, phone: Phone, provinceIds: ProvinceId[], role?: UserRole): Promise<Result<User, Error>>;
    static createExisting(id: UserId, name: Name, email: Email, password: Password, phone: Phone, role: Role, provinceIds: ProvinceId[]): Result<User, Error>;
    updatePassword(newPassword: Password): void;
    get name(): Name;
    get email(): Email;
    get password(): Password;
    get phone(): Phone;
    get role(): Role;
    get provinceIds(): ProvinceId[];
    addProvince(provinceId: ProvinceId): void;
}
export {};
