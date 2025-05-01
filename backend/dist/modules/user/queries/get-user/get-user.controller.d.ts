import { GetUserService } from './get-user.service';
import { Response } from 'express';
export declare class GetUserController {
    private readonly userService;
    constructor(userService: GetUserService);
    getCurrentUser(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
