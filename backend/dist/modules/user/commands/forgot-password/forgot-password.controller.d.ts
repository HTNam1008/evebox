import { Response } from 'express';
import { ForgotPasswordUserService } from './forgot-password.service';
import { ForgotPasswordUserDto } from './forgot-password.dto';
export declare class ForgotPasswordController {
    private readonly forgotPasswordService;
    constructor(forgotPasswordService: ForgotPasswordUserService);
    forgotPassword(res: Response, forgotPasswordUserDto: ForgotPasswordUserDto): Promise<Response>;
}
