import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsEnum } from 'class-validator';
import { OTPType } from 'src/modules/auth/domain/enums/otp-type.enum';

export class VerifyOTPDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'OTP code (6 digits)',
  })
  @IsString()
  @Length(6, 6)
  otp: string;

  @ApiProperty({
    enum: OTPType,
    example: OTPType.FORGOT_PASSWORD,
    description: 'Type of OTP verification',
  })
  @IsEnum(OTPType)
  type: OTPType;

  @ApiProperty({
    example: 'token',
    description: 'Request token',
  })
  request_token: string;
}