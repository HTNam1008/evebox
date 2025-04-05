import { IsEmail, IsString, Length, IsEnum } from 'class-validator';
import { OTPType } from 'src/common/enums/otp-type.enum';

export class VerifyOTPDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  otp: string;

  @IsEnum(OTPType)
  type: OTPType;

  @IsString()
  request_token: string;
}
