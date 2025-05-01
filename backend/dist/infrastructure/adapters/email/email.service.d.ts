import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class EmailService implements OnModuleInit {
    private readonly configService;
    private transporter;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    sendWelcomeEmail(to: string): Promise<void>;
    sendRoleAssignedEmail(to: string, role: string): Promise<void>;
    sendOTPEmail(email: string, otp: string, type: string): Promise<void>;
    sendPasswordResetConfirmation(email: string): Promise<void>;
}
