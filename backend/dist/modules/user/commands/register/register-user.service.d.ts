import { RegisterUserCommand } from './register-user.command';
import { Result } from 'oxide.ts';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { TempUserStore } from 'src/infrastructure/local-storage/local-storage.service';
import { OtpUtils } from 'src/shared/utils/otp/otp.util';
export declare class RegisterUserService {
    private readonly authRepository;
    private readonly temUserRepository;
    private readonly otpUtils;
    constructor(authRepository: UserRepositoryImpl, temUserRepository: TempUserStore, otpUtils: OtpUtils);
    execute(command: RegisterUserCommand): Promise<Result<{
        request_token: string;
        remaining_attempts: number;
        resend_allowed_in: number;
    }, Error>>;
}
