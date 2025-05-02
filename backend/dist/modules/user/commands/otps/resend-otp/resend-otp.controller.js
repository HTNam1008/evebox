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
exports.ResendOTPController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const resend_otp_dto_1 = require("./resend-otp.dto");
const resend_otp_service_1 = require("./resend-otp.service");
const resend_otp_command_1 = require("./resend-otp.command");
const error_handler_1 = require("../../../../../shared/exceptions/error.handler");
const constants_1 = require("../../../../../shared/constants/constants");
let ResendOTPController = class ResendOTPController {
    constructor(resendOTPService) {
        this.resendOTPService = resendOTPService;
    }
    async resendOTP(dto, res) {
        const command = new resend_otp_command_1.ResendOTPCommand(dto.email, dto.type, dto.request_token);
        const result = await this.resendOTPService.execute(command);
        if (result.isErr()) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: constants_1.USER_MESSAGES.SUCCESS.OTP_RESENT,
            data: {
                remaining_attempts: data.remaining_attempts,
                resend_allowed_in: data.resend_allowed_in
            },
        };
    }
};
exports.ResendOTPController = ResendOTPController;
__decorate([
    (0, common_1.Post)('resend-otp'),
    (0, swagger_1.ApiOperation)({
        summary: 'Resend OTP code',
        description: 'Resend OTP verification code to user email'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'OTP resent successfully',
        type: resend_otp_dto_1.ResendOTPResponse
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid email or cooldown period not elapsed'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_otp_dto_1.ResendOTPDto, Object]),
    __metadata("design:returntype", Promise)
], ResendOTPController.prototype, "resendOTP", null);
exports.ResendOTPController = ResendOTPController = __decorate([
    (0, common_1.Controller)('api/user/otps'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [resend_otp_service_1.ResendOTPService])
], ResendOTPController);
//# sourceMappingURL=resend-otp.controller.js.map