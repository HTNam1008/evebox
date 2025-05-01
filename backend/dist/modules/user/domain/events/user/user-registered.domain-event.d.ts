import { DomainEvent } from "src/libs/ddd/domain-event.base";
import { User } from '../../entities/user.entity';
export declare class UserRegisteredDomainEvent extends DomainEvent {
    readonly user: User;
    constructor(user: User);
}
