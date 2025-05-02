"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisteredDomainEvent = void 0;
const domain_event_base_1 = require("../../../../../libs/ddd/domain-event.base");
class UserRegisteredDomainEvent extends domain_event_base_1.DomainEvent {
    constructor(user) {
        super();
        this.user = user;
    }
}
exports.UserRegisteredDomainEvent = UserRegisteredDomainEvent;
//# sourceMappingURL=user-registered.domain-event.js.map