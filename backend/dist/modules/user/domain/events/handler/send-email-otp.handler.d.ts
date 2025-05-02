import { IEventHandler } from '@nestjs/cqrs';
import { EmailService } from 'src/infrastructure/adapters/email/email.service';
import { SendEmailOTPDomainEvent } from '../user/send-email-otp.domain-event';
export declare class SendEmailOtpHandler implements IEventHandler<SendEmailOTPDomainEvent> {
    private readonly emailService;
    constructor(emailService: EmailService);
    handle(event: SendEmailOTPDomainEvent): Promise<void>;
}
