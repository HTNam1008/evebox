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
exports.GetUserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_impl_1 = require("../../repositories/user.repository.impl");
const email_vo_1 = require("../../domain/value-objects/user/email.vo");
const oxide_ts_1 = require("oxide.ts");
let GetUserService = class GetUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        const emailOrError = email_vo_1.Email.create(email);
        if (emailOrError.isErr()) {
            return (0, oxide_ts_1.Err)(emailOrError.unwrapErr());
        }
        const user = await this.userRepository.findByEmail(emailOrError.unwrap());
        if (user != null) {
            return (0, oxide_ts_1.Ok)({
                id: user.id.value,
                name: user.name.value,
                email: user.email.value,
                role: user.role.getValue(),
                phone: user.phone.value,
            });
        }
    }
};
exports.GetUserService = GetUserService;
exports.GetUserService = GetUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_impl_1.UserRepositoryImpl])
], GetUserService);
//# sourceMappingURL=get-user.service.js.map