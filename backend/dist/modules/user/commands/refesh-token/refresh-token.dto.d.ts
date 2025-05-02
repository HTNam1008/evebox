export declare class RefreshTokenDto {
    refresh_token: string;
}
declare class RefreshTokenResponseData {
    access_token: string;
    refresh_token: string;
}
export declare class RefreshTokenResponse {
    statusCode: number;
    message: string;
    data: RefreshTokenResponseData;
}
export {};
