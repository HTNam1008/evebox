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
exports.GetUserController = void 0;
const common_1 = require("@nestjs/common");
const get_user_service_1 = require("./get-user.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../shared/guard/jwt-auth.guard");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const get_user_dto_1 = require("./get-user.dto");
let GetUserController = class GetUserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getCurrentUser(req, res) {
        const currentUser = await this.userService.execute(req.user.email);
        if (currentUser.isErr()) {
            return res.status(404).json(error_handler_1.ErrorHandler.notFound('User not found'));
        }
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: 200,
            message: 'User details fetched successfully',
            data: {
                ...currentUser.unwrap(),
            }
        });
    }
};
exports.GetUserController = GetUserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Current User Details',
        description: 'Retrieves details of the currently authenticated user'
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authorization (`Bearer <token>`)',
        required: true
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User details fetched successfully',
        type: get_user_dto_1.UserResponse
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized - Invalid or missing token'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'User not found'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GetUserController.prototype, "getCurrentUser", null);
exports.GetUserController = GetUserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [get_user_service_1.GetUserService])
], GetUserController);
//# sourceMappingURL=get-user.controller.js.map