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
exports.ForgotPasswordUserService = void 0;
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const email_vo_1 = require("../../domain/value-objects/user/email.vo");
const user_repository_impl_1 = require("../../repositories/user.repository.impl");
const otp_type_enum_1 = require("../../domain/enums/otp-type.enum");
const otp_entity_1 = require("../../domain/entities/otp.entity");
const otp_util_1 = require("../../../../shared/utils/otp/otp.util");
const constants_1 = require("../../../../shared/constants/constants");
let ForgotPasswordUserService = class ForgotPasswordUserService {
    constructor(authRepository, otpUtils) {
        this.authRepository = authRepository;
        this.otpUtils = otpUtils;
    }
    async execute(command) {
        const emailOrError = email_vo_1.Email.create(command.email);
        if (emailOrError.isErr()) {
            return (0, oxide_ts_1.Err)(emailOrError.unwrapErr());
        }
        const email = emailOrError.unwrap();
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.USER_NOT_FOUND));
        }
        const otpResult = otp_entity_1.OTP.create(email, otp_type_enum_1.OTPType.FORGOT_PASSWORD);
        if (otpResult.isErr()) {
            return (0, oxide_ts_1.Err)(otpResult.unwrapErr());
        }
        const otp = otpResult.unwrap();
        const requestToken = this.otpUtils.generateRequestToken(otp.email.value, otp_type_enum_1.OTPType[otp.type]);
        await this.authRepository.save(user);
        await this.authRepository.saveOTP(otp, requestToken);
        return (0, oxide_ts_1.Ok)({
            request_token: requestToken,
            remaining_attempts: otp.getRemainingAttempts(),
            resend_allowed_in: otp.resendCooldown,
        });
    }
};
exports.ForgotPasswordUserService = ForgotPasswordUserService;
exports.ForgotPasswordUserService = ForgotPasswordUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl,
        otp_util_1.OtpUtils])
], ForgotPasswordUserService);
//# sourceMappingURL=forgot-password.service.js.map