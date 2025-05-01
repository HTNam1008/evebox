"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailOTPDomainEvent = void 0;
const domain_event_base_1 = require("../../../../../libs/ddd/domain-event.base");
class SendEmailOTPDomainEvent extends domain_event_base_1.DomainEvent {
    constructor(email, otp, type, expiresAt) {
        super();
        this.email = email;
        this.otp = otp;
        this.type = type;
        this.expiresAt = expiresAt;
    }
}
exports.SendEmailOTPDomainEvent = SendEmailOTPDomainEvent;
//# sourceMappingURL=send-email-otp.domain-event.js.map