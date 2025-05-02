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
exports.VerifyOTPService = void 0;
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const email_vo_1 = require("../../../domain/value-objects/user/email.vo");
const user_repository_impl_1 = require("../../../repositories/user.repository.impl");
const otp_type_enum_1 = require("../../../domain/enums/otp-type.enum");
const otp_util_1 = require("../../../../../shared/utils/otp/otp.util");
const local_storage_service_1 = require("../../../../../infrastructure/local-storage/local-storage.service");
const user_entity_1 = require("../../../domain/entities/user.entity");
const constants_1 = require("../../../../../shared/constants/constants");
let VerifyOTPService = class VerifyOTPService {
    constructor(authRepository, otpUtils, tempUserRepository) {
        this.authRepository = authRepository;
        this.otpUtils = otpUtils;
        this.tempUserRepository = tempUserRepository;
    }
    async execute(command) {
        if (!command.type) {
            return (0, oxide_ts_1.Err)(new Error(constants_1.OTP_MESSAGES.ERRORS.TYPE_REQUIRED));
        }
        const emailOrError = email_vo_1.Email.create(command.email);
        if (emailOrError.isErr()) {
            return (0, oxide_ts_1.Err)(emailOrError.unwrapErr());
        }
        const email = emailOrError.unwrap();
        const otpData = await this.authRepository.findValidOTP(email.value, command.otp, command.type, command.request_token);
        if (!otpData) {
            const OTPAttempts = await this.authRepository.getOTPAttempts(command.request_token);
            const remaining_attempts = constants_1.OTPConstants.MAX_ATTEMPTS - OTPAttempts;
            if (remaining_attempts <= 0) {
                await this.authRepository.markOTPAsUsed(command.request_token);
                return (0, oxide_ts_1.Err)(new Error(constants_1.OTP_MESSAGES.ERRORS.MAX_ATTEMPTS_REACHED));
            }
            await this.authRepository.incrementOTPAttempts(command.request_token);
            return (0, oxide_ts_1.Err)(new Error(constants_1.OTP_MESSAGES.ERRORS.INVALID_OR_EXPIRED(remaining_attempts)));
        }
        if (command.type === otp_type_enum_1.OTPType.FORGOT_PASSWORD) {
            const user = await this.authRepository.findByEmail(email);
            if (!user) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.OTP_MESSAGES.ERRORS.USER_NOT_FOUND));
            }
            const token = this.otpUtils.generateToken(email.value, command.type);
            await this.authRepository.markOTPAsUsed(otpData.requestToken);
            return (0, oxide_ts_1.Ok)(token);
        }
        if (command.type === otp_type_enum_1.OTPType.REGISTER) {
            const temp = await this.tempUserRepository.get(command.request_token);
            if (!temp) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.OTP_MESSAGES.ERRORS.LOCAL_STORAGE_USER_NOT_FOUND));
            }
            const userOrError = await user_entity_1.User.createNew(temp.name, temp.email, temp.password, temp.phone, temp.provinceIds, temp.role.getValue());
            if (userOrError.isErr()) {
                return (0, oxide_ts_1.Err)(userOrError.unwrapErr());
            }
            const user = userOrError.unwrap();
            await this.authRepository.save(user);
            await this.tempUserRepository.delete(command.request_token);
            await this.authRepository.markOTPAsUsed(otpData.requestToken);
            return (0, oxide_ts_1.Ok)(user.id.toString());
        }
        return (0, oxide_ts_1.Err)(new Error(constants_1.OTP_MESSAGES.ERRORS.INVALID_TYPE));
    }
};
exports.VerifyOTPService = VerifyOTPService;
exports.VerifyOTPService = VerifyOTPService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl,
        otp_util_1.OtpUtils,
        local_storage_service_1.TempUserStore])
], VerifyOTPService);
//# sourceMappingURL=verify-otp.service.js.map