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
exports.RefreshTokenController = void 0;
const common_1 = require("@nestjs/common");
const refresh_token_service_1 = require("./refresh-token.service");
const refresh_token_command_1 = require("./refresh-token.command");
const swagger_1 = require("@nestjs/swagger");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const refresh_token_dto_1 = require("./refresh-token.dto");
const constants_1 = require("../../../../shared/constants/constants");
let RefreshTokenController = class RefreshTokenController {
    constructor(refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }
    async refreshToken(dto, res) {
        try {
            if (!dto.refresh_token) {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json(error_handler_1.ErrorHandler.badRequest(constants_1.REFRESH_TOKEN_MESSAGES.ERRORS.MISSING_REFRESH_TOKEN));
            }
            const command = new refresh_token_command_1.RefreshTokenCommand(dto.refresh_token);
            const result = await this.refreshTokenService.execute(command);
            if (result.isErr()) {
                return res
                    .status(common_1.HttpStatus.UNAUTHORIZED)
                    .json(error_handler_1.ErrorHandler.unauthorized(result.unwrapErr().message));
            }
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: constants_1.REFRESH_TOKEN_MESSAGES.SUCCESS.REFRESHED,
                data: result.unwrap()
            });
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(error_handler_1.ErrorHandler.internalServerError(constants_1.REFRESH_TOKEN_MESSAGES.ERRORS.FAILED_REFRESH_TOKEN));
        }
    }
};
exports.RefreshTokenController = RefreshTokenController;
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Refresh access token',
        description: 'Generate new access token using refresh token'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Token refreshed successfully',
        type: refresh_token_dto_1.RefreshTokenResponse
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid or expired refresh token'
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Missing refresh token'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Failed to refresh token'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto, Object]),
    __metadata("design:returntype", Promise)
], RefreshTokenController.prototype, "refreshToken", null);
exports.RefreshTokenController = RefreshTokenController = __decorate([
    (0, common_1.Controller)('api/user'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [refresh_token_service_1.RefreshTokenService])
], RefreshTokenController);
//# sourceMappingURL=refresh-token.controller.js.map