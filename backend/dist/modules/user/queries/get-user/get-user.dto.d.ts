declare class UserData {
    id: string;
    name: string;
    email: string;
    role: number;
    phone: string;
}
export declare class UserResponse {
    statusCode: number;
    message: string;
    data: UserData;
}
export {};
