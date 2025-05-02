export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
    re_password: string;
    phone: string;
    role_id: number;
    province_id?: number[];
}
declare class RegisterResponseData {
    request_token: string;
    remaining_attempts: number;
    resend_allowed_in: number;
}
export declare class RegisterResponse {
    statusCode: number;
    message: string;
    data: RegisterResponseData;
}
export {};
