import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { Result } from 'oxide.ts';
export declare class GetUserService {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryImpl);
    execute(email: string): Promise<Result<{
        id: string;
        name: string;
        email: string;
        role: number;
        phone: string;
    }, Error>>;
}
