import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { Email } from '../../domain/value-objects/user/email.vo';
import { AuthRepositoryImpl } from '../../repositories/auth.repository.impl';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordUserCommand } from './forgot-password.command';
import { OTPType } from '../../domain/enums/otp-type.enum';
import { OTP } from '../../domain/entities/otp.entity';
import { OtpUtils } from 'src/shared/utils/otp/otp.util';

@Injectable()
export class ForgotPasswordUserService {
  constructor(
    private readonly authRepository: AuthRepositoryImpl,
    private readonly configService: ConfigService,
    private readonly otpUtils: OtpUtils,
  ) {}

  async execute(
    command: ForgotPasswordUserCommand,
  ): Promise<
    Result<
      {
        request_token: string;
        remaining_attempts: number;
        resend_allowed_in: number;
      },
      Error
    >
  > {
    // Validate email
    const emailOrError = Email.create(command.email);
    if (emailOrError.isErr()) {
      return Err(emailOrError.unwrapErr());
    }
    const email = emailOrError.unwrap();

    // Check if user exists
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      return Err(new Error('Invalid credentials'));
    }

    // Create OTP and trigger domain event
    const otpResult = OTP.create(email, OTPType.FORGOT_PASSWORD);

    if (otpResult.isErr()) {
      return Err(otpResult.unwrapErr());
    }

    const otp = otpResult.unwrap();

    const requestToken = this.otpUtils.generateRequestToken(
      otp.email.value,
      OTPType[otp.type],
    );

    // Save user with new domain event
    await this.authRepository.save(user);

    // Save OTP to database
    await this.authRepository.saveOTP(otp, requestToken);

    return Ok({
      request_token: requestToken,
      remaining_attempts: otp.getRemainingAttempts(),
      resend_allowed_in: otp.resendCooldown,
    });
  }
}
