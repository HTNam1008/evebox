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
exports.SendEmailOtpHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const email_service_1 = require("../../../../../infrastructure/adapters/email/email.service");
const send_email_otp_domain_event_1 = require("../user/send-email-otp.domain-event");
let SendEmailOtpHandler = class SendEmailOtpHandler {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async handle(event) {
        const { email, otp, type } = event;
        await this.emailService.sendOTPEmail(email, otp, type);
    }
};
exports.SendEmailOtpHandler = SendEmailOtpHandler;
exports.SendEmailOtpHandler = SendEmailOtpHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.EventsHandler)(send_email_otp_domain_event_1.SendEmailOTPDomainEvent),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], SendEmailOtpHandler);
//# sourceMappingURL=send-email-otp.handler.js.map