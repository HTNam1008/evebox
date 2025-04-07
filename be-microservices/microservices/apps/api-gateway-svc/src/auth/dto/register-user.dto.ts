import { ArrayNotEmpty, ArrayUnique, IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class RegisterUserDto {
  
  @IsNotEmpty()
  name: string;

  
  @IsEmail()
  email: string;

  
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  
  @IsNotEmpty()
  @MinLength(6)
  re_password: string;

  
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
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

