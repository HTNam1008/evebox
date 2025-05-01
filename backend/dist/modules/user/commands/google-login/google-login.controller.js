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
exports.GoogleLoginController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const google_login_service_1 = require("./google-login.service");
const google_login_command_1 = require("./google-login.command");
const swagger_1 = require("@nestjs/swagger");
const google_login_dto_1 = require("./google-login.dto");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
let GoogleLoginController = class GoogleLoginController {
    constructor(googleLoginService) {
        this.googleLoginService = googleLoginService;
    }
    async googleLogin() {
    }
    async googleLoginCallback(req, res) {
        try {
            const command = new google_login_command_1.GoogleLoginCommand(req.user.fullname, req.user.username, req.user.email, req.user.avatar);
            const result = await this.googleLoginService.execute(command);
            if (result.isErr()) {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json(error_handler_1.ErrorHandler.unauthorized(result.unwrapErr().message));
            }
            const tokens = result.unwrap();
            return res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                {
                  type: 'GOOGLE_LOGIN_SUCCESS',
                  data: ${JSON.stringify(tokens)}
                }, 
                'http://localhost:3000/'
              );
              window.close();
            }
          </script>
        </body>
      </html>
    `);
        }
        catch (error) {
            return res.send(`
      <script>
        if (window.opener) {
          window.opener.postMessage(
            {
              type: 'GOOGLE_LOGIN_ERROR',
              error: 'Authentication failed'
            }, 
            'http://localhost:3000/'
          );
          window.close();
        }
      </script>
    `);
        }
    }
};
exports.GoogleLoginController = GoogleLoginController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleLoginController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, swagger_1.ApiOperation)({
        summary: 'Google OAuth2 callback',
        description: 'Handles the Google OAuth2 callback and returns JWT tokens'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Login successful',
        type: google_login_dto_1.GoogleLoginResponse
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Authentication failed'
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GoogleLoginController.prototype, "googleLoginCallback", null);
exports.GoogleLoginController = GoogleLoginController = __decorate([
    (0, common_1.Controller)('api/user/google'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [google_login_service_1.GoogleLoginService])
], GoogleLoginController);
//# sourceMappingURL=google-login.controller.js.map