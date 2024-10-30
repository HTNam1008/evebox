// register-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  // Optional: allow setting role during registration
  // Use validation to restrict roles if necessary
  role?: string;
}
