import { OTPType } from 'src/modules/user/domain/enums/otp-type.enum';
import { JwtService } from '@nestjs/jwt';
export declare class JwtUtils {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(email: string, type: OTPType): string;
    generateRequestToken(email: string, type: string): string;
}
