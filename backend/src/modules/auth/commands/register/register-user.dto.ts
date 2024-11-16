// register-user.dto.ts
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEmail, isInt, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  phone: string;

  @IsInt()
  role_id: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  province_id?: number[];
}
