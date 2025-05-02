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
exports.VerifyOTPController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const verify_otp_command_1 = require("./verify-otp.command");
const verify_otp_service_1 = require("./verify-otp.service");
const verify_otp_dto_1 = require("./verify-otp.dto");
const otp_type_enum_1 = require("../../../domain/enums/otp-type.enum");
const error_handler_1 = require("../../../../../shared/exceptions/error.handler");
const constants_1 = require("../../../../../shared/constants/constants");
let VerifyOTPController = class VerifyOTPController {
    constructor(verifyOTPService) {
        this.verifyOTPService = verifyOTPService;
    }
    async verifyOTP(dto, res) {
        try {
            const command = new verify_otp_command_1.VerifyOTPCommand(dto.email, dto.otp, dto.type, dto.request_token);
            const result = await this.verifyOTPService.execute(command);
            if (result.isErr()) {
                const error = result.unwrapErr();
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json(error_handler_1.ErrorHandler.badRequest(error.message));
            }
            const data = result.unwrap();
            const responseMessage = command.type === otp_type_enum_1.OTPType.FORGOT_PASSWORD
                ? constants_1.OTP_MESSAGES.SUCCESS.FORGOT_PASSWORD
                : constants_1.OTP_MESSAGES.SUCCESS.REGISTER;
            const token = command.type === otp_type_enum_1.OTPType.FORGOT_PASSWORD ? data : null;
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: responseMessage,
                data: {
                    token: token,
                },
            });
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(error_handler_1.ErrorHandler.internalServerError());
        }
    }
};
exports.VerifyOTPController = VerifyOTPController;
__decorate([
    (0, common_1.Post)('verify-otp'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify OTP code',
        description: 'Verify OTP code sent to user email for registration or password reset'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'OTP verified successfully',
        type: verify_otp_dto_1.VerifyOTPResponse
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid OTP or email'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'User not found'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Failed to verify OTP'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOTPDto, Object]),
    __metadata("design:returntype", Promise)
], VerifyOTPController.prototype, "verifyOTP", null);
exports.VerifyOTPController = VerifyOTPController = __decorate([
    (0, common_1.Controller)('api/user/otps'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [verify_otp_service_1.VerifyOTPService])
], VerifyOTPController);
//# sourceMappingURL=verify-otp.controller.js.map