import { ValueObject } from 'src/libs/ddd/value-object.base';
import { UserRole } from '../../enums/user-role.enum';
import { Result } from 'oxide.ts';
interface RoleProps {
    value: UserRole;
}
export declare class Role extends ValueObject<RoleProps> {
    private constructor();
    static create(role: UserRole): Result<Role, Error>;
    getValue(): UserRole;
    isAdmin(): boolean;
    isOrganizer(): boolean;
    isCustomer(): boolean;
}
export {};
