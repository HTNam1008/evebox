import { JwtService } from '@nestjs/jwt';
import { UserRepositoryImpl } from '../../repositories/user.repository.impl';
import { RefreshTokenCommand } from './refresh-token.command';
import { ConfigService } from '@nestjs/config';
import { Result } from 'oxide.ts';
export declare class RefreshTokenService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(authRepository: UserRepositoryImpl, jwtService: JwtService, configService: ConfigService);
    execute(command: RefreshTokenCommand): Promise<Result<{
        access_token: string;
        refresh_token: string;
    }, Error>>;
}
