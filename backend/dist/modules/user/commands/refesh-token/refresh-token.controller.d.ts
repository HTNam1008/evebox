import { Response } from 'express';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenDto } from './refresh-token.dto';
export declare class RefreshTokenController {
    private readonly refreshTokenService;
    constructor(refreshTokenService: RefreshTokenService);
    refreshToken(dto: RefreshTokenDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
