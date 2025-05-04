import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old password',
    example: 'OldPass123!'
  })
  // @MinLength(8)
  @IsString()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password must contain uppercase, lowercase, number/special character'
  // })
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'NewPass123!'
  })
  @IsString()
  // @MinLength(8)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password must contain uppercase, lowercase, number/special character'
  // })
  newPassword: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'NewPass123!'
  })
  @IsString()
  confirmPassword: string;
}

export class ResetPasswordResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ 
    example: 'Password has been change successfully',
    description: 'Success message'
  })
  message: string;

  @ApiProperty({ 
    type: 'object',
    properties: {},
    nullable: true,
    default: null
  })
  data: null;
}