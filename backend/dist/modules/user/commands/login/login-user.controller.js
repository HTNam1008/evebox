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
exports.LoginUserController = void 0;
const common_1 = require("@nestjs/common");
const login_user_dto_1 = require("./login-user.dto");
const login_user_service_1 = require("./login-user.service");
const login_user_command_1 = require("./login-user.command");
const swagger_1 = require("@nestjs/swagger");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const constants_1 = require("../../../../shared/constants/constants");
let LoginUserController = class LoginUserController {
    constructor(loginUserService) {
        this.loginUserService = loginUserService;
    }
    async login(loginUserDto, res) {
        const command = new login_user_command_1.LoginUserCommand(loginUserDto.email, loginUserDto.password);
        const result = await this.loginUserService.execute(command);
        if (result.isErr()) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: constants_1.USER_MESSAGES.SUCCESS.LOGIN,
            data: {
                ...data,
            },
        });
    }
};
exports.LoginUserController = LoginUserController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'User login',
        description: 'Authenticate user with email and password'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Login successful',
        type: login_user_dto_1.LoginResponse
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid input format'
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid credentials'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], LoginUserController.prototype, "login", null);
exports.LoginUserController = LoginUserController = __decorate([
    (0, common_1.Controller)('api/user'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [login_user_service_1.LoginUserService])
], LoginUserController);
//# sourceMappingURL=login-user.controller.js.map