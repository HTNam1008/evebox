export declare class LoginUserDto {
    email: string;
    password: string;
}
declare class LoginResponseData {
    access_token: string;
    refresh_token: string;
}
export declare class LoginResponse {
    statusCode: number;
    message: string;
    data: LoginResponseData;
}
export {};
