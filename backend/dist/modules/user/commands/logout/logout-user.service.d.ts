import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { Result } from 'oxide.ts';
export declare class LogoutUserService {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryImpl);
    execute(email: string): Promise<Result<void, Error>>;
}
