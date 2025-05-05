import { ChangePasswordDto } from './change-password.dto';

export class ChangePasswordCommand {
  constructor(
    public readonly oldPassword: string,
    public readonly newPassword: string,
    public readonly confirmPassword: string,
    public readonly userEmail: string,
  ) {}

  static create(dto: ChangePasswordDto, userEmail: string): ChangePasswordCommand {
    return new ChangePasswordCommand(
      dto.oldPassword,
      dto.newPassword,
      dto.confirmPassword,
      userEmail,
    );
  }
}