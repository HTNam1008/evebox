import { Result } from 'oxide.ts';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { ForgotPasswordUserCommand } from './forgot-password.command';
import { OtpUtils } from 'src/shared/utils/otp/otp.util';
export declare class ForgotPasswordUserService {
    private readonly authRepository;
    private readonly otpUtils;
    constructor(authRepository: UserRepositoryImpl, otpUtils: OtpUtils);
    execute(command: ForgotPasswordUserCommand): Promise<Result<{
        request_token: string;
        remaining_attempts: number;
        resend_allowed_in: number;
    }, Error>>;
}
