import { IsString, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  // @MinLength(8)
  @IsString()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password must contain uppercase, lowercase, number/special character'
  // })
  oldPassword: string;

  @IsString()
  // @MinLength(8)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password must contain uppercase, lowercase, number/special character'
  // })
  newPassword: string;

  @IsString()
  confirmPassword: string;
}
