export class LogoutUserCommand {
    constructor(
      public readonly email: string,
      public readonly role_id: number,
    ) {}
  }
  