import { HttpStatus } from '@nestjs/common';
import { ResendOTPDto } from './resend-otp.dto';
import { ResendOTPService } from './resend-otp.service';
import { Response } from 'express';
export declare class ResendOTPController {
    private readonly resendOTPService;
    constructor(resendOTPService: ResendOTPService);
    resendOTP(dto: ResendOTPDto, res: Response): Promise<Response<any, Record<string, any>> | {
        statusCode: HttpStatus;
        message: string;
        data: {
            remaining_attempts: number;
            resend_allowed_in: number;
        };
    }>;
}
