export declare class ForgotPasswordUserDto {
    email: string;
}
declare class ForgotPasswordResponseData {
    request_token: string;
    remaining_attempts: number;
    resend_allowed_in: number;
}
export declare class ForgotPasswordResponse {
    statusCode: number;
    message: string;
    data: ForgotPasswordResponseData;
}
export {};
