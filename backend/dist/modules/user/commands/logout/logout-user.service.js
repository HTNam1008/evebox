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
exports.LogoutUserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_impl_1 = require("../../repositories/user.repository.impl");
const oxide_ts_1 = require("oxide.ts");
const constants_1 = require("../../../../shared/constants/constants");
let LogoutUserService = class LogoutUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        try {
            await this.userRepository.revokeAllRefreshTokens(email);
            console.log('Revoke all refresh tokens for user:', email);
            return (0, oxide_ts_1.Ok)(void 0);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error(constants_1.USER_MESSAGES.ERRORS.LOGOUT_FAILED(error.message)));
        }
    }
};
exports.LogoutUserService = LogoutUserService;
exports.LogoutUserService = LogoutUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl])
], LogoutUserService);
//# sourceMappingURL=logout-user.service.js.map