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
exports.ResendOTPService = void 0;
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const local_storage_service_1 = require("../../../../../infrastructure/local-storage/local-storage.service");
const otp_type_enum_1 = require("../../../domain/enums/otp-type.enum");
const user_repository_impl_1 = require("../../../repositories/user.repository.impl");
const otp_entity_1 = require("../../../domain/entities/otp.entity");
const email_vo_1 = require("../../../domain/value-objects/user/email.vo");
const constants_1 = require("../../../../../shared/constants/constants");
let ResendOTPService = class ResendOTPService {
    constructor(authRepository, tempUserRepository) {
        this.authRepository = authRepository;
        this.tempUserRepository = tempUserRepository;
    }
    async execute(command) {
        const emailOrError = email_vo_1.Email.create(command.email);
        if (emailOrError.isErr()) {
            return (0, oxide_ts_1.Err)(emailOrError.unwrapErr());
        }
        const email = emailOrError.unwrap();
        if (command.type === otp_type_enum_1.OTPType.REGISTER) {
            const tempUser = await this.tempUserRepository.get(command.request_token);
            if (!tempUser) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.OTP_MESSAGES.ERRORS.INVALID_REQUEST_TOKEN));
            }
        }
        const otpResult = otp_entity_1.OTP.create(email, command.type);
        if (otpResult.isErr()) {
            return (0, oxide_ts_1.Err)(otpResult.unwrapErr());
        }
        const otp = otpResult.unwrap();
        await this.authRepository.saveOTP(otp, command.request_token);
        return (0, oxide_ts_1.Ok)({
            remaining_attempts: otp.getRemainingAttempts(),
            resend_allowed_in: otp.resendCooldown,
        });
    }
};
exports.ResendOTPService = ResendOTPService;
exports.ResendOTPService = ResendOTPService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl,
        local_storage_service_1.TempUserStore])
], ResendOTPService);
//# sourceMappingURL=resend-otp.service.js.map