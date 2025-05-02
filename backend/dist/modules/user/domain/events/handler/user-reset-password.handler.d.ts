import { IEventHandler } from '@nestjs/cqrs';
import { UserPasswordResetDomainEvent } from '../user/user-reset-password.domain-event';
import { EmailService } from 'src/infrastructure/adapters/email/email.service';
export declare class UserPasswordResetHandler implements IEventHandler<UserPasswordResetDomainEvent> {
    private readonly emailService;
    constructor(emailService: EmailService);
    handle(event: UserPasswordResetDomainEvent): Promise<void>;
}
