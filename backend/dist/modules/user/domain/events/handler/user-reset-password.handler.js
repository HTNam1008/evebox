"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordResetHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const user_reset_password_domain_event_1 = require("../user/user-reset-password.domain-event");
const email_service_1 = require("../../../../../infrastructure/adapters/email/email.service");
let UserPasswordResetHandler = class UserPasswordResetHandler {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async handle(event) {
        const { user } = event;
        await this.emailService.sendPasswordResetConfirmation(user.email.value);
    }
};
exports.UserPasswordResetHandler = UserPasswordResetHandler;
exports.UserPasswordResetHandler = UserPasswordResetHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.EventsHandler)(user_reset_password_domain_event_1.UserPasswordResetDomainEvent),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], UserPasswordResetHandler);
//# sourceMappingURL=user-reset-password.handler.js.map