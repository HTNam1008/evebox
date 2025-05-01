"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordResetDomainEvent = void 0;
const domain_event_base_1 = require("../../../../../libs/ddd/domain-event.base");
class UserPasswordResetDomainEvent extends domain_event_base_1.DomainEvent {
    constructor(user) {
        super();
        this.user = user;
    }
}
exports.UserPasswordResetDomainEvent = UserPasswordResetDomainEvent;
//# sourceMappingURL=user-reset-password.domain-event.js.map