import { RegisterUserDto } from './register-user.dto';
import { RegisterUserService } from './register-user.service';
import { Response } from 'express';
export declare class RegisterUserController {
    private readonly registerUserService;
    constructor(registerUserService: RegisterUserService);
    register(registerUserDto: RegisterUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
