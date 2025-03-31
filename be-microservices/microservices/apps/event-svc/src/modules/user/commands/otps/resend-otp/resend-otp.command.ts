import { OTPType } from "src/modules/user/domain/enums/otp-type.enum";

export class ResendOTPCommand {
  constructor(
    public readonly email: string,
    public readonly type: OTPType,
    public readonly request_token: string,
  ) {}
}