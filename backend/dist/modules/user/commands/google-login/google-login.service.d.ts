import { GoogleLoginCommand } from './google-login.command';
import { JwtService } from '@nestjs/jwt';
import { Result } from 'oxide.ts';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { ConfigService } from '@nestjs/config';
export declare class GoogleLoginService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(authRepository: UserRepositoryImpl, jwtService: JwtService, configService: ConfigService);
    execute(command: GoogleLoginCommand): Promise<Result<{
        access_token: string;
        refresh_token: string;
    }, Error>>;
}
