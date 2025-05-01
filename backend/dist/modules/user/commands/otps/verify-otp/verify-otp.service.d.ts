import { Result } from 'oxide.ts';
import { UserRepositoryImpl } from '../../../repositories/user.repository.impl';
import { VerifyOTPCommand } from './verify-otp.command';
import { OtpUtils } from 'src/shared/utils/otp/otp.util';
import { TempUserStore } from 'src/infrastructure/local-storage/local-storage.service';
export declare class VerifyOTPService {
    private readonly authRepository;
    private readonly otpUtils;
    private readonly tempUserRepository;
    constructor(authRepository: UserRepositoryImpl, otpUtils: OtpUtils, tempUserRepository: TempUserStore);
    execute(command: VerifyOTPCommand): Promise<Result<string, Error>>;
}
