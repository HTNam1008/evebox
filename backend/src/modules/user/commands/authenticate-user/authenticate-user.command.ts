// authenticate-user.command.ts
export class AuthenticateUserCommand {
    constructor(
      public readonly email: string,
      public readonly password: string,
    ) {}
  }
  