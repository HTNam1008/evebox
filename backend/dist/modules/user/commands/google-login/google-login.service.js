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
exports.GoogleLoginService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const oxide_ts_1 = require("oxide.ts");
const user_repository_impl_1 = require("../../repositories/user.repository.impl");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../../domain/entities/user.entity");
const name_vo_1 = require("../../domain/value-objects/user/name.vo");
const email_vo_1 = require("../../domain/value-objects/user/email.vo");
const password_vo_1 = require("../../domain/value-objects/user/password.vo");
const user_role_enum_1 = require("../../domain/enums/user-role.enum");
const phone_vo_1 = require("../../domain/value-objects/user/phone.vo");
const province_id_vo_1 = require("../../domain/value-objects/user/province-id.vo");
const constants_1 = require("../../../../shared/constants/constants");
let GoogleLoginService = class GoogleLoginService {
    constructor(authRepository, jwtService, configService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async execute(command) {
        const emailOrError = email_vo_1.Email.create(command.email);
        if (emailOrError.isErr()) {
            return (0, oxide_ts_1.Err)(emailOrError.unwrapErr());
        }
        const email = emailOrError.unwrap();
        const nameOrError = name_vo_1.Name.create(command.fullname);
        if (nameOrError.isErr()) {
            return (0, oxide_ts_1.Err)(nameOrError.unwrapErr());
        }
        const name = nameOrError.unwrap();
        const password = (await password_vo_1.Password.create('google')).unwrap();
        const phoneOrError = phone_vo_1.Phone.create('0123456789');
        if (phoneOrError.isErr()) {
            return (0, oxide_ts_1.Err)(phoneOrError.unwrapErr());
        }
        const phone = phoneOrError.unwrap();
        const provinceIdsOrError = province_id_vo_1.ProvinceId.createList([]);
        if (provinceIdsOrError.isErr()) {
            return (0, oxide_ts_1.Err)(provinceIdsOrError.unwrapErr());
        }
        const provinceIds = provinceIdsOrError.unwrap();
        let user = await this.authRepository.findByEmail(email);
        if (!user) {
            const userOrError = await user_entity_1.User.createNew(name, email, password, phone, provinceIds, user_role_enum_1.UserRole.CUSTOMER);
            if (userOrError.isErr()) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.FAILED_CREATE_USER));
            }
            const newUser = userOrError.unwrap();
            await this.authRepository.save(newUser);
            user = await this.authRepository.findByEmail(email);
            if (!user) {
                return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.USER_NOT_FOUND));
            }
        }
        const payload = { email: user.email.value, role: user.role.getValue() };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.authRepository.saveRefreshToken(refreshToken, user.email.value, expiresAt);
        return (0, oxide_ts_1.Ok)({ access_token: accessToken, refresh_token: refreshToken });
    }
};
exports.GoogleLoginService = GoogleLoginService;
exports.GoogleLoginService = GoogleLoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl,
        jwt_1.JwtService,
        config_1.ConfigService])
], GoogleLoginService);
//# sourceMappingURL=google-login.service.js.map