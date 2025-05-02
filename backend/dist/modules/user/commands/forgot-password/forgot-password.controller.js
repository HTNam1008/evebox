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
exports.ForgotPasswordController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const forgot_password_command_1 = require("./forgot-password.command");
const forgot_password_service_1 = require("./forgot-password.service");
const forgot_password_dto_1 = require("./forgot-password.dto");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const constants_1 = require("../../../../shared/constants/constants");
let ForgotPasswordController = class ForgotPasswordController {
    constructor(forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
    }
    async forgotPassword(res, forgotPasswordUserDto) {
        const command = new forgot_password_command_1.ForgotPasswordUserCommand(forgotPasswordUserDto.email);
        const result = await this.forgotPasswordService.execute(command);
        if (result.isErr()) {
            const error = result.unwrapErr();
            if (error.message === constants_1.USER_MESSAGES.ERRORS.USER_NOT_FOUND) {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json(error_handler_1.ErrorHandler.notFound());
            }
            return res
                .status(common_1.HttpStatus.OK)
                .json(error_handler_1.ErrorHandler.badRequest(error.message));
        }
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: constants_1.USER_MESSAGES.SUCCESS.OTP_SENT,
            data: {
                ...result.unwrap(),
            }
        });
    }
};
exports.ForgotPasswordController = ForgotPasswordController;
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, swagger_1.ApiOperation)({
        summary: 'Request OTP for password reset',
        description: 'Sends an OTP to the user\'s email address for password reset'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'OTP sent successfully',
        type: forgot_password_dto_1.ForgotPasswordResponse
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request - Invalid email format'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'User not found with provided email'
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forgot_password_dto_1.ForgotPasswordUserDto]),
    __metadata("design:returntype", Promise)
], ForgotPasswordController.prototype, "forgotPassword", null);
exports.ForgotPasswordController = ForgotPasswordController = __decorate([
    (0, common_1.Controller)('api/user'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [forgot_password_service_1.ForgotPasswordUserService])
], ForgotPasswordController);
//# sourceMappingURL=forgot-password.controller.js.map