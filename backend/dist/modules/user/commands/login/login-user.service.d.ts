import { LoginUserCommand } from './login-user.command';
import { JwtService } from '@nestjs/jwt';
import { Result } from 'oxide.ts';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { ConfigService } from '@nestjs/config';
export declare class LoginUserService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(userRepository: UserRepositoryImpl, jwtService: JwtService, configService: ConfigService);
    execute(command: LoginUserCommand): Promise<Result<{
        access_token: string;
        refresh_token: string;
    }, Error>>;
}
