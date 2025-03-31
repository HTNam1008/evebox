import { OTPType } from "src/modules/auth/domain/enums/otp-type.enum";

export class ResendOTPCommand {
  constructor(
    public readonly email: string,
    public readonly type: OTPType,
    public readonly request_token: string,
  ) {}
}