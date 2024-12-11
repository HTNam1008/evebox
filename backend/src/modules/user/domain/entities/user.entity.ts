// src/modules/user/domain/entities/user.entity.ts

import { AggregateRoot } from 'src/libs/ddd/aggregate-root.base';
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { UserRole } from '../enums/user-role.enum';
import { Role } from '../value-objects/role.vo';
import { UserRegisteredDomainEvent } from '../events/user-registered.domain-event';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: string,
    public readonly phone: string,
    public readonly created_at: Date
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      phone: this.phone,
      created_at: this.created_at
    };
  }
}
