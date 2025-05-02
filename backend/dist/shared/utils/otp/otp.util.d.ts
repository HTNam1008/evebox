import { OTPType } from 'src/modules/user/domain/enums/otp-type.enum';
import { ConfigService } from '@nestjs/config';
export declare class OtpUtils {
    private readonly configService;
    constructor(configService: ConfigService);
    generateToken(email: string, type: OTPType): string;
    generateRequestToken(email: string, type: string): string;
}
