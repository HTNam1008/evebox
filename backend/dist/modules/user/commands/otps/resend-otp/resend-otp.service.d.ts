import { Result } from 'oxide.ts';
import { ResendOTPCommand } from './resend-otp.command';
import { TempUserStore } from 'src/infrastructure/local-storage/local-storage.service';
import { UserRepositoryImpl } from 'src/modules/user/repositories/user.repository.impl';
export declare class ResendOTPService {
    private readonly authRepository;
    private readonly tempUserRepository;
    constructor(authRepository: UserRepositoryImpl, tempUserRepository: TempUserStore);
    execute(command: ResendOTPCommand): Promise<Result<{
        remaining_attempts: number;
        resend_allowed_in: number;
    }, Error>>;
}
