"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const register_user_controller_1 = require("./commands/register/register-user.controller");
const register_user_service_1 = require("./commands/register/register-user.service");
const login_user_controller_1 = require("./commands/login/login-user.controller");
const login_user_service_1 = require("./commands/login/login-user.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("../../shared/strategies/jwt.strategy");
const send_welcome_email_service_1 = require("./domain/events/handler/send-welcome-email.service");
const email_module_1 = require("../../infrastructure/adapters/email/email.module");
const cqrs_1 = require("@nestjs/cqrs");
const user_repository_impl_1 = require("./repositories/user.repository.impl");
const logout_user_controller_1 = require("./commands/logout/logout-user.controller");
const logout_user_service_1 = require("./commands/logout/logout-user.service");
const refresh_token_service_1 = require("./commands/refesh-token/refresh-token.service");
const refresh_token_controller_1 = require("./commands/refesh-token/refresh-token.controller");
const send_email_otp_handler_1 = require("./domain/events/handler/send-email-otp.handler");
const forgot_password_controller_1 = require("./commands/forgot-password/forgot-password.controller");
const forgot_password_service_1 = require("./commands/forgot-password/forgot-password.service");
const verify_otp_controller_1 = require("./commands/otps/verify-otp/verify-otp.controller");
const verify_otp_service_1 = require("./commands/otps/verify-otp/verify-otp.service");
const reset_password_service_1 = require("./commands/reset-password/reset-password.service");
const user_reset_password_handler_1 = require("./domain/events/handler/user-reset-password.handler");
const reset_password_controller_1 = require("./commands/reset-password/reset-password.controller");
const local_storage_module_1 = require("../../infrastructure/local-storage/local-storage.module");
const otp_module_1 = require("../../shared/utils/otp/otp.module");
const resend_otp_controller_1 = require("./commands/otps/resend-otp/resend-otp.controller");
const resend_otp_service_1 = require("./commands/otps/resend-otp/resend-otp.service");
const google_login_controller_1 = require("./commands/google-login/google-login.controller");
const google_strategy_1 = require("../../shared/strategies/google.strategy");
const google_login_service_1 = require("./commands/google-login/google-login.service");
const get_user_controller_1 = require("./queries/get-user/get-user.controller");
const get_user_service_1 = require("./queries/get-user/get-user.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            cqrs_1.CqrsModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
                }),
                inject: [config_1.ConfigService],
            }),
            email_module_1.EmailModule,
            local_storage_module_1.LocalStorageModule,
            otp_module_1.OtpUtilsModule,
        ],
        controllers: [
            resend_otp_controller_1.ResendOTPController,
            reset_password_controller_1.ResetPasswordController,
            verify_otp_controller_1.VerifyOTPController,
            register_user_controller_1.RegisterUserController,
            login_user_controller_1.LoginUserController,
            logout_user_controller_1.LogoutUserController,
            refresh_token_controller_1.RefreshTokenController,
            forgot_password_controller_1.ForgotPasswordController,
            google_login_controller_1.GoogleLoginController,
            get_user_controller_1.GetUserController,
        ],
        providers: [
            register_user_service_1.RegisterUserService,
            login_user_service_1.LoginUserService,
            logout_user_service_1.LogoutUserService,
            send_welcome_email_service_1.SendWelcomeEmailHandler,
            user_repository_impl_1.UserRepositoryImpl,
            jwt_strategy_1.JwtStrategy,
            google_strategy_1.GoogleStrategy,
            refresh_token_service_1.RefreshTokenService,
            send_email_otp_handler_1.SendEmailOtpHandler,
            forgot_password_service_1.ForgotPasswordUserService,
            verify_otp_service_1.VerifyOTPService,
            reset_password_service_1.ResetPasswordService,
            user_reset_password_handler_1.UserPasswordResetHandler,
            resend_otp_service_1.ResendOTPService,
            google_login_service_1.GoogleLoginService,
            get_user_service_1.GetUserService
        ],
        exports: [user_repository_impl_1.UserRepositoryImpl],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map