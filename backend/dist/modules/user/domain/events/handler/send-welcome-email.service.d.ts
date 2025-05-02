import { IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredDomainEvent } from '../user/user-registered.domain-event';
import { EmailService } from 'src/infrastructure/adapters/email/email.service';
export declare class SendWelcomeEmailHandler implements IEventHandler<UserRegisteredDomainEvent> {
    private readonly emailService;
    constructor(emailService: EmailService);
    handle(event: UserRegisteredDomainEvent): Promise<void>;
}
