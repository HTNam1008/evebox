import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OTPType } from 'src/common/enums/otp-type.enum';

// Request DTO
export class ResendOTPDto {
  @IsEmail()
  email: string;

  @IsEnum(OTPType)
  type: OTPType;

  @IsString()
  @IsNotEmpty()
  request_token: string;
}