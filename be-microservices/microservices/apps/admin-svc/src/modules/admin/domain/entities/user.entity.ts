import { AggregateRoot } from 'src/libs/ddd/aggregate-root.base';
import { Result, Ok, Err } from 'oxide.ts';
import { UserId } from '../value-objects/user-id.vo';
import { UserChangeStatusDomainEvent } from '../events/producer/user/user-change-status.event';

interface UserProps {
  email: string;
  name: string;
  status: string;
  role_id: number;
}

export class User extends AggregateRoot<UserId, UserProps> {
  private constructor(id: UserId, props: UserProps) {
    super(id, props);
  }

  public static createExisting(
    id: UserId,
    name: string,
    email: string,
    status: string,
    role_id: number,
  ): Result<User, Error> {
    return Ok(new User(id, {
      email,
      name,
      status,
      role_id
    }))
  }

  public updateStatus(status: string): void {
    this.props.status = status;

    this.addDomainEvent(
      new UserChangeStatusDomainEvent(this)
    );
  }

  public get status(): string {
    return this.props.status;
  }
}
