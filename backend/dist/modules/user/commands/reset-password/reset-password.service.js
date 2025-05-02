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
exports.ResetPasswordService = void 0;
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const user_repository_impl_1 = require("../../repositories/user.repository.impl");
const password_vo_1 = require("../../domain/value-objects/user/password.vo");
const email_vo_1 = require("../../domain/value-objects/user/email.vo");
const constants_1 = require("../../../../shared/constants/constants");
let ResetPasswordService = class ResetPasswordService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        try {
            if (command.newPassword !== command.confirmPassword) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.PASSWORDS_MISMATCH));
            }
            const [email] = command.resetToken.split('_');
            if (!email) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.RESET_TOKEN_MESSAGES.ERRORS.INVALID_RESET_TOKEN));
            }
            const emailOrError = email_vo_1.Email.create(email);
            if (emailOrError.isErr()) {
                return (0, oxide_ts_1.Err)(emailOrError.unwrapErr());
            }
            const emailVo = emailOrError.unwrap();
            const user = await this.userRepository.findByEmail(emailVo);
            if (!user) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.USER_NOT_FOUND));
            }
            const passwordOrError = await password_vo_1.Password.create(command.newPassword);
            if (passwordOrError.isErr()) {
                return (0, oxide_ts_1.Err)(passwordOrError.unwrapErr());
            }
            const newPassword = passwordOrError.unwrap();
            user.updatePassword(newPassword);
            await this.userRepository.save(user);
            await this.userRepository.revokeAllRefreshTokens(user.email.value);
            return (0, oxide_ts_1.Ok)(void 0);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.RESET_PASSWORD_FAILED));
        }
    }
};
exports.ResetPasswordService = ResetPasswordService;
exports.ResetPasswordService = ResetPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl])
], ResetPasswordService);
//# sourceMappingURL=reset-password.service.js.map