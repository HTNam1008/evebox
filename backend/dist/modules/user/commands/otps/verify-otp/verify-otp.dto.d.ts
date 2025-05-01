import { OTPType } from 'src/modules/user/domain/enums/otp-type.enum';
export declare class VerifyOTPDto {
    email: string;
    otp: string;
    type: OTPType;
    request_token: string;
}
declare class VerifyOTPResponseData {
    token: string | null;
}
export declare class VerifyOTPResponse {
    statusCode: number;
    message: string;
    data: VerifyOTPResponseData;
}
export {};
