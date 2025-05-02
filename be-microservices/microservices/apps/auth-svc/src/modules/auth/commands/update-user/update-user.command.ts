import { UpdateUserDto } from "./update-user.dto";

export class UpdateUserCommand {
  constructor(
    public readonly name?: string,
    public readonly phone?: string,
    public readonly avatar_id?: number,
    public readonly email?: string,
  ) {}

  static create(dto: UpdateUserDto, email: string): UpdateUserCommand {
    return new UpdateUserCommand(
      dto.name,
      dto.phone,
      dto.avatar_id,
      email,
    );
  }
}