"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
const aggregate_root_base_1 = require("../../../../libs/ddd/aggregate-root.base");
const oxide_ts_1 = require("oxide.ts");
const otp_id_vo_1 = require("../value-objects/otp/otp-id.vo");
const send_email_otp_domain_event_1 = require("../events/user/send-email-otp.domain-event");
const constants_1 = require("../../../../shared/constants/constants");
class OTP extends aggregate_root_base_1.AggregateRoot {
    constructor(id, props) {
        super(id, props);
    }
    static generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    static create(email, type) {
        try {
            const id = otp_id_vo_1.OTPId.generate();
            const otp = OTP.generateOTP();
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + 15);
            const otpEntity = new OTP(id, {
                id,
                email,
                otp,
                type,
                expiresAt,
                isUsed: false,
                createdAt: new Date(),
                attempts: 0,
                resendCooldown: OTP.RESEND_COOLDOWN,
            });
            otpEntity.addDomainEvent(new send_email_otp_domain_event_1.SendEmailOTPDomainEvent(email.value, otp, type, expiresAt));
            return (0, oxide_ts_1.Ok)(otpEntity);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to create OTP'));
        }
    }
    get email() {
        return this.props.email;
    }
    get otp() {
        return this.props.otp;
    }
    get type() {
        return this.props.type;
    }
    get expiresAt() {
        return this.props.expiresAt;
    }
    get isUsed() {
        return this.props.isUsed;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get attempts() {
        return this.props.attempts;
    }
    get resendCooldown() {
        return this.props.resendCooldown;
    }
    set otp(value) {
        this.props.otp = value;
    }
    canAttempt() {
        return this.props.attempts < OTP.MAX_ATTEMPTS;
    }
    getRemainingAttempts() {
        return OTP.MAX_ATTEMPTS - this.props.attempts;
    }
    incrementAttempt() {
        if (!this.canAttempt()) {
            return (0, oxide_ts_1.Err)(new Error('Maximum attempts exceeded'));
        }
        this.props.attempts += 1;
        return (0, oxide_ts_1.Ok)(void 0);
    }
    isValid() {
        return !this.props.isUsed && new Date() < this.props.expiresAt;
    }
    markAsUsed() {
        if (!this.isValid()) {
            return (0, oxide_ts_1.Err)(new Error('OTP is invalid or expired'));
        }
        this.props.isUsed = true;
        return (0, oxide_ts_1.Ok)(void 0);
    }
    static createExisting(id, email, otp, type, expiresAt, isUsed, createdAt, attempts = 0) {
        return (0, oxide_ts_1.Ok)(new OTP(id, {
            id,
            email,
            otp,
            type,
            expiresAt,
            isUsed,
            createdAt,
            attempts,
            resendCooldown: OTP.RESEND_COOLDOWN,
        }));
    }
}
exports.OTP = OTP;
OTP.MAX_ATTEMPTS = constants_1.OTPConstants.MAX_ATTEMPTS;
OTP.RESEND_COOLDOWN = constants_1.OTPConstants.RESEND_COOLDOWN;
//# sourceMappingURL=otp.entity.js.map