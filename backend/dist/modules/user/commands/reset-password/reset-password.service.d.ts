import { Result } from 'oxide.ts';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { ResetPasswordCommand } from './reset-password.command';
export declare class ResetPasswordService {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryImpl);
    execute(command: ResetPasswordCommand): Promise<Result<void, Error>>;
}
