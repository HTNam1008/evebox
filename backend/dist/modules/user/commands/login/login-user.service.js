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
exports.LoginUserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const oxide_ts_1 = require("oxide.ts");
const email_vo_1 = require("../../domain/value-objects/user/email.vo");
const user_repository_impl_1 = require("../../repositories/user.repository.impl");
const config_1 = require("@nestjs/config");
const constants_1 = require("../../../../shared/constants/constants");
let LoginUserService = class LoginUserService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async execute(command) {
        const emailOrError = email_vo_1.Email.create(command.email);
        if (emailOrError.isErr()) {
            return (0, oxide_ts_1.Err)(emailOrError.unwrapErr());
        }
        const email = emailOrError.unwrap();
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.LOGIN_FAILED));
        }
        const passwordMatches = await user.password.comparePassword(command.password);
        if (!passwordMatches) {
            return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.LOGIN_FAILED));
        }
        const payload = { email: user.email.value, role: user.role.getValue() };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.userRepository.saveRefreshToken(refreshToken, user.email.value, expiresAt);
        return (0, oxide_ts_1.Ok)({ access_token: accessToken, refresh_token: refreshToken });
    }
};
exports.LoginUserService = LoginUserService;
exports.LoginUserService = LoginUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl,
        jwt_1.JwtService,
        config_1.ConfigService])
], LoginUserService);
//# sourceMappingURL=login-user.service.js.map