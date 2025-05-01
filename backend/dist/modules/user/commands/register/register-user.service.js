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
exports.RegisterUserService = void 0;
const common_1 = require("@nestjs/common");
const email_vo_1 = require("../../domain/value-objects/user/email.vo");
const password_vo_1 = require("../../domain/value-objects/user/password.vo");
const name_vo_1 = require("../../domain/value-objects/user/name.vo");
const phone_vo_1 = require("../../domain/value-objects/user/phone.vo");
const province_id_vo_1 = require("../../domain/value-objects/user/province-id.vo");
const user_role_enum_1 = require("../../domain/enums/user-role.enum");
const role_vo_1 = require("../../domain/value-objects/user/role.vo");
const oxide_ts_1 = require("oxide.ts");
const user_repository_impl_1 = require("../../repositories/user.repository.impl");
const local_storage_service_1 = require("../../../../infrastructure/local-storage/local-storage.service");
const otp_type_enum_1 = require("../../domain/enums/otp-type.enum");
const otp_util_1 = require("../../../../shared/utils/otp/otp.util");
const otp_entity_1 = require("../../domain/entities/otp.entity");
const constants_1 = require("../../../../shared/constants/constants");
let RegisterUserService = class RegisterUserService {
    constructor(authRepository, temUserRepository, otpUtils) {
        this.authRepository = authRepository;
        this.temUserRepository = temUserRepository;
        this.otpUtils = otpUtils;
    }
    async execute(command) {
        try {
            const emailOrError = email_vo_1.Email.create(command.email);
            if (emailOrError.isErr()) {
                return (0, oxide_ts_1.Err)(emailOrError.unwrapErr());
            }
            const email = emailOrError.unwrap();
            const existingUser = await this.authRepository.findByEmail(email);
            if (existingUser) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.EMAIL_EXISTS));
            }
            const nameOrError = name_vo_1.Name.create(command.name);
            if (nameOrError.isErr()) {
                return (0, oxide_ts_1.Err)(nameOrError.unwrapErr());
            }
            const name = nameOrError.unwrap();
            const phoneOrError = phone_vo_1.Phone.create(command.phone);
            if (phoneOrError.isErr()) {
                return (0, oxide_ts_1.Err)(phoneOrError.unwrapErr());
            }
            const phone = phoneOrError.unwrap();
            const provinceIdsOrError = province_id_vo_1.ProvinceId.createList(command.province_id);
            if (provinceIdsOrError.isErr()) {
                return (0, oxide_ts_1.Err)(provinceIdsOrError.unwrapErr());
            }
            const provinceIds = provinceIdsOrError.unwrap();
            const roleOrError = role_vo_1.Role.create(command.role_id ? command.role_id : user_role_enum_1.UserRole.CUSTOMER);
            if (roleOrError.isErr()) {
                return (0, oxide_ts_1.Err)(roleOrError.unwrapErr());
            }
            const role = roleOrError.unwrap();
            if (command.re_password !== command.password) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.PASSWORDS_MISMATCH));
            }
            const passwordOrError = await password_vo_1.Password.create(command.password);
            if (passwordOrError.isErr()) {
                return (0, oxide_ts_1.Err)(passwordOrError.unwrapErr());
            }
            const password = passwordOrError.unwrap();
            const otpResult = otp_entity_1.OTP.create(email, otp_type_enum_1.OTPType.REGISTER);
            if (otpResult.isErr()) {
                return (0, oxide_ts_1.Err)(otpResult.unwrapErr());
            }
            const otp = otpResult.unwrap();
            const requestToken = this.otpUtils.generateRequestToken(otp.email.value, otp_type_enum_1.OTPType[otp.type]);
            await this.authRepository.saveOTP(otp, requestToken);
            await this.temUserRepository.save(requestToken, { name, email, password, phone, provinceIds, role }, 900);
            return (0, oxide_ts_1.Ok)({
                request_token: requestToken,
                remaining_attempts: otp.getRemainingAttempts(),
                resend_allowed_in: otp.resendCooldown,
            });
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.REGISTER_ERROR));
        }
    }
};
exports.RegisterUserService = RegisterUserService;
exports.RegisterUserService = RegisterUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl,
        local_storage_service_1.TempUserStore,
        otp_util_1.OtpUtils])
], RegisterUserService);
//# sourceMappingURL=register-user.service.js.map