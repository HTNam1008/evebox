import { LogoutUserService } from './logout-user.service';
import { Response } from 'express';
export declare class LogoutUserController {
    private readonly logoutService;
    constructor(logoutService: LogoutUserService);
    logout(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
