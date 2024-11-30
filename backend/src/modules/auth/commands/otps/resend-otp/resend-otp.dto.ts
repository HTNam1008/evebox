import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OTPType } from 'src/modules/auth/domain/enums/otp-type.enum';

export class ResendOTPDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: OTPType })
  @IsEnum(OTPType)
  type: OTPType;

  @ApiProperty({ example: 'token123' })
  @IsString()
  @IsNotEmpty()
  request_token: string;
}