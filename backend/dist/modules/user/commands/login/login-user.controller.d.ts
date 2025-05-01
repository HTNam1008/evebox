import { LoginUserDto } from './login-user.dto';
import { LoginUserService } from './login-user.service';
import { Response } from 'express';
export declare class LoginUserController {
    private readonly loginUserService;
    constructor(loginUserService: LoginUserService);
    login(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
