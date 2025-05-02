export declare class GoogleLoginDto {
    fullname: string;
    username: string;
    email: string;
    avatar: string;
}
declare class GoogleLoginResponseData {
    access_token: string;
    refresh_token: string;
}
export declare class GoogleLoginResponse {
    statusCode: number;
    message: string;
    data: GoogleLoginResponseData;
}
export {};
