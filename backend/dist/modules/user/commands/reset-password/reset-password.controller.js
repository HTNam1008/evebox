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
exports.ResetPasswordController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reset_password_command_1 = require("./reset-password.command");
const reset_password_service_1 = require("./reset-password.service");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const reset_password_dto_1 = require("./reset-password.dto");
let ResetPasswordController = class ResetPasswordController {
    constructor(resetPasswordService) {
        this.resetPasswordService = resetPasswordService;
    }
    async resetPassword(command, res) {
        try {
            const result = await this.resetPasswordService.execute(command);
            if (result.isErr()) {
                const error = result.unwrapErr();
                if (error.message === 'User not found') {
                    return res
                        .status(common_1.HttpStatus.NOT_FOUND)
                        .json(error_handler_1.ErrorHandler.notFound('User not found'));
                }
                if (error.message === 'Passwords do not match') {
                    return res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json(error_handler_1.ErrorHandler.badRequest('Passwords do not match'));
                }
                if (error.message === 'Invalid reset token') {
                    return res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json(error_handler_1.ErrorHandler.badRequest('Invalid reset token'));
                }
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json(error_handler_1.ErrorHandler.badRequest(error.message));
            }
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: 'Password has been reset successfully',
                data: result.unwrap()
            });
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(error_handler_1.ErrorHandler.internalServerError('Failed to reset password'));
        }
    }
};
exports.ResetPasswordController = ResetPasswordController;
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reset password using reset token',
        description: 'Reset user password using token received after OTP verification'
    }),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Password reset successfully',
        type: reset_password_dto_1.ResetPasswordResponse
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid input or reset token'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'User not found'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Failed to reset password'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_command_1.ResetPasswordCommand, Object]),
    __metadata("design:returntype", Promise)
], ResetPasswordController.prototype, "resetPassword", null);
exports.ResetPasswordController = ResetPasswordController = __decorate([
    (0, common_1.Controller)('api/user'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [reset_password_service_1.ResetPasswordService])
], ResetPasswordController);
//# sourceMappingURL=reset-password.controller.js.map