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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserController = void 0;
const common_1 = require("@nestjs/common");
const register_user_dto_1 = require("./register-user.dto");
const register_user_service_1 = require("./register-user.service");
const register_user_command_1 = require("./register-user.command");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../../shared/constants/constants");
let RegisterUserController = class RegisterUserController {
    constructor(registerUserService) {
        this.registerUserService = registerUserService;
    }
    async register(registerUserDto, res) {
        const command = new register_user_command_1.RegisterUserCommand(registerUserDto.name, registerUserDto.email, registerUserDto.password, registerUserDto.re_password, registerUserDto.phone, registerUserDto.role_id, registerUserDto.province_id);
        const result = await this.registerUserService.execute(command);
        if (result.isErr()) {
            return res.status(400).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: result.unwrapErr().message
            });
        }
        return res.status(200).json({
            statusCode: common_1.HttpStatus.OK,
            message: constants_1.USER_MESSAGES.SUCCESS.REGISTER,
            data: {
                ...result.unwrap(),
            }
        });
    }
};
exports.RegisterUserController = RegisterUserController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Register new user',
        description: 'Register new user and send OTP for verification'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'OTP sent successfully',
        type: register_user_dto_1.RegisterResponse
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request - Invalid input data'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", Promise)
], RegisterUserController.prototype, "register", null);
exports.RegisterUserController = RegisterUserController = __decorate([
    (0, common_1.Controller)('/api/user'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [register_user_service_1.RegisterUserService])
], RegisterUserController);
//# sourceMappingURL=register-user.controller.js.map