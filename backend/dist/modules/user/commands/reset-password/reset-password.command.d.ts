import { ResetPasswordDto } from './reset-password.dto';
export declare class ResetPasswordCommand {
    readonly resetToken: string;
    readonly newPassword: string;
    readonly confirmPassword: string;
    constructor(resetToken: string, newPassword: string, confirmPassword: string);
    static create(dto: ResetPasswordDto): ResetPasswordCommand;
}
