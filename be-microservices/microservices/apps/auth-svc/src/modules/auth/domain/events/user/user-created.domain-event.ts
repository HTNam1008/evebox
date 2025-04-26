import { DomainEvent } from "src/libs/ddd/domain-event.base";
import { Status } from "../../value-objects/user/status.vo";

export class UserCreatedDomainEvent extends DomainEvent {
  constructor(
    public readonly user_id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly status: Status,
    public readonly role_id: number,
  ) {
    super();
  }
}
