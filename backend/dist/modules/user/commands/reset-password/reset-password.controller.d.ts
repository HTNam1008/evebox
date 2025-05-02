import { Response } from 'express';
import { ResetPasswordCommand } from './reset-password.command';
import { ResetPasswordService } from './reset-password.service';
export declare class ResetPasswordController {
    private readonly resetPasswordService;
    constructor(resetPasswordService: ResetPasswordService);
    resetPassword(command: ResetPasswordCommand, res: Response): Promise<Response<any, Record<string, any>>>;
}
