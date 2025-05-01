import { GoogleLoginService } from './google-login.service';
import { Response } from 'express';
import { GoogleLoginDto } from './google-login.dto';
interface GoogleUser {
    fullname: string;
    username: string;
    email: string;
    avatar: string;
}
export declare class GoogleLoginController {
    private readonly googleLoginService;
    constructor(googleLoginService: GoogleLoginService);
    googleLogin(): Promise<void>;
    googleLoginCallback(req: GoogleLoginDto & {
        user: GoogleUser;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
