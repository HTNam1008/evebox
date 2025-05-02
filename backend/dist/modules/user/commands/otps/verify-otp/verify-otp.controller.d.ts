import { Response } from 'express';
import { VerifyOTPService } from './verify-otp.service';
import { VerifyOTPDto } from './verify-otp.dto';
export declare class VerifyOTPController {
    private readonly verifyOTPService;
    constructor(verifyOTPService: VerifyOTPService);
    verifyOTP(dto: VerifyOTPDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
