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
exports.LogoutUserController = void 0;
const common_1 = require("@nestjs/common");
const logout_user_service_1 = require("./logout-user.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../shared/guard/jwt-auth.guard");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const logout_user_dto_1 = require("./logout-user.dto");
const constants_1 = require("../../../../shared/constants/constants");
let LogoutUserController = class LogoutUserController {
    constructor(logoutService) {
        this.logoutService = logoutService;
    }
    async logout(req, res) {
        try {
            await this.logoutService.execute(req.user.email);
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: constants_1.USER_MESSAGES.SUCCESS.LOGOUT,
                data: null
            });
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(error_handler_1.ErrorHandler.internalServerError(constants_1.USER_MESSAGES.ERRORS.SERVER_ERROR));
        }
    }
};
exports.LogoutUserController = LogoutUserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({
        summary: 'User logout',
        description: 'Invalidate user session and revoke refresh token'
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authorization (`Bearer <token>`)',
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User logged out successfully',
        type: logout_user_dto_1.LogoutResponse
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid or missing token'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Server error while logging out'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LogoutUserController.prototype, "logout", null);
exports.LogoutUserController = LogoutUserController = __decorate([
    (0, common_1.Controller)('api/user'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [logout_user_service_1.LogoutUserService])
], LogoutUserController);
//# sourceMappingURL=logout-user.controller.js.map