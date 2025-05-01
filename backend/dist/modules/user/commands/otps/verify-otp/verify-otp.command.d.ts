import { OTPType } from 'src/modules/user/domain/enums/otp-type.enum';
import { VerifyOTPDto } from './verify-otp.dto';
export declare class VerifyOTPCommand {
    readonly email: string;
    readonly otp: string;
    readonly type: OTPType;
    readonly request_token: string;
    constructor(email: string, otp: string, type: OTPType, request_token: string);
    static create(dto: VerifyOTPDto): VerifyOTPCommand;
}
