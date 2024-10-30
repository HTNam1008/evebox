// register-user.command.ts
export class RegisterUserCommand {
    constructor(
      public readonly email: string,
      public readonly password: string,
      public readonly role?: string, // Optional: default to CUSTOMER
    ) {}
  }
  