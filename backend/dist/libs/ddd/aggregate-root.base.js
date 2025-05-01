"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const entity_base_1 = require("./entity.base");
class AggregateRoot extends entity_base_1.Entity {
    constructor() {
        super(...arguments);
        this.domainEvents = [];
    }
    addDomainEvent(event) {
        this.domainEvents.push(event);
    }
    getDomainEvents() {
        return this.domainEvents;
    }
    clearDomainEvents() {
        this.domainEvents = [];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=aggregate-root.base.js.map