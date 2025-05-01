import { DomainEvent } from "src/libs/ddd/domain-event.base";
export declare class SendEmailOTPDomainEvent extends DomainEvent {
    readonly email: string;
    readonly otp: string;
    readonly type: string;
    readonly expiresAt: Date;
    constructor(email: string, otp: string, type: string, expiresAt: Date);
}
