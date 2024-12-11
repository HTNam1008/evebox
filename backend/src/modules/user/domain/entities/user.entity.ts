// src/modules/user/domain/entities/user.entity.ts

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
