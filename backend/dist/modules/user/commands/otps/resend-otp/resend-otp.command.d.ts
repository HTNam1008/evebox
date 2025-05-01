import { OTPType } from "src/modules/user/domain/enums/otp-type.enum";
export declare class ResendOTPCommand {
    readonly email: string;
    readonly type: OTPType;
    readonly request_token: string;
    constructor(email: string, type: OTPType, request_token: string);
}
