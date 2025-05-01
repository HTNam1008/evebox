import { OTPType } from 'src/modules/user/domain/enums/otp-type.enum';
export declare class ResendOTPDto {
    email: string;
    type: OTPType;
    request_token: string;
}
export declare class ResendOTPResponse {
    statusCode: number;
    message: string;
    data: {
        remaining_attempts: number;
        resend_allowed_in: number;
    };
}
