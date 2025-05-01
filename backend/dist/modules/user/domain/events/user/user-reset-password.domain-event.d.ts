import { DomainEvent } from 'src/libs/ddd/domain-event.base';
import { User } from '../../entities/user.entity';
export declare class UserPasswordResetDomainEvent extends DomainEvent {
    readonly user: User;
    constructor(user: User);
}
