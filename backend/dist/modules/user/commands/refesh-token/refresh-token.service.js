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
exports.RefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_repository_impl_1 = require("../../repositories/user.repository.impl");
const config_1 = require("@nestjs/config");
const oxide_ts_1 = require("oxide.ts");
let RefreshTokenService = class RefreshTokenService {
    constructor(authRepository, jwtService, configService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async execute(command) {
        try {
            const payload = this.jwtService.verify(command.refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const existingToken = await this.authRepository.findRefreshToken(command.refreshToken);
            if (!existingToken || existingToken.revoked) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const newAccessToken = this.jwtService.sign({ email: payload.email, role: payload.role }, {
                expiresIn: this.configService.get('JWT_EXPIRES_IN'),
            });
            await this.authRepository.revokeRefreshToken(command.refreshToken);
            const newRefreshToken = this.jwtService.sign({ email: payload.email, role: payload.rol }, {
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            await this.authRepository.saveRefreshToken(newRefreshToken, payload.email, expiresAt);
            return (0, oxide_ts_1.Ok)({
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.RefreshTokenService = RefreshTokenService;
exports.RefreshTokenService = RefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl,
        jwt_1.JwtService,
        config_1.ConfigService])
], RefreshTokenService);
//# sourceMappingURL=refresh-token.service.js.map