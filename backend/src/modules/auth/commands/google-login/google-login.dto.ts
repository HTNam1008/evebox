import { IsEmail, IsNotEmpty } from "class-validator";

export class GoogleLoginDto {
    @IsNotEmpty()
    fullname: string;

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    avatar: string;
  }
  