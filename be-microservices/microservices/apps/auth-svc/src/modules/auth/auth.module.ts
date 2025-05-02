import { Module } from '@nestjs/common';
import { RegisterUserController } from './commands/register/register-user.controller';
import { RegisterUserService } from './commands/register/register-user.service';
import { LoginUserController } from './commands/login/login-user.controller';
import { LoginUserService } from './commands/login/login-user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { SendWelcomeEmailHandler } from './domain/events/handler/send-welcome-email.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import { LogoutUserController } from './commands/logout/logout-user.controller';
import { LogoutUserService } from './commands/logout/logout-user.service';
import { RefreshTokenService } from './commands/refesh-token/refresh-token.service';
import { RefreshTokenController } from './commands/refesh-token/refresh-token.controller';
import { SendEmailOtpHandler } from './domain/events/handler/send-email-otp.handler';
import { ForgotPasswordController } from './commands/forgot-password/forgot-password.controller';
import { ForgotPasswordUserService } from './commands/forgot-password/forgot-password.service';
import { VerifyOTPController } from './commands/otps/verify-otp/verify-otp.controller';
import { VerifyOTPService } from './commands/otps/verify-otp/verify-otp.service';
import { ResetPasswordService } from './commands/reset-password/reset-password.service';
import { UserPasswordResetHandler } from './domain/events/handler/user-reset-password.handler';
import { ResetPasswordController } from './commands/reset-password/reset-password.controller';
import { LocalStorageModule } from 'src/infrastructure/local-storage/local-storage.module';
import { OtpUtilsModule } from 'src/shared/utils/otp/otp.module';
import { ResendOTPController } from './commands/otps/resend-otp/resend-otp.controller';
import { ResendOTPService } from './commands/otps/resend-otp/resend-otp.service';
import { GoogleLoginController } from './commands/google-login/google-login.controller';
import { GoogleStrategy } from 'src/shared/strategies/google.strategy';
import { GoogleLoginService } from './commands/google-login/google-login.service';
import { GetUserController } from './queries/get-user/get-user.controller';
import { GetUserService } from './queries/get-user/get-user.service';
import { KafkaModule } from 'src/infrastructure/adapters/kafka/kafka.module';
import { RedisModule, CacheService } from '@evebox/redis';
import { UpdateUserController } from './commands/update-user/update-user.controller';
import { UpdateUserService } from './commands/update-user/update-user.service';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    LocalStorageModule,
    OtpUtilsModule,
    KafkaModule,
    RedisModule.register({
      keyPrefix: 'auth:',
    }),
  ],
  controllers: [
    ResendOTPController,
    ResetPasswordController,
    VerifyOTPController,
    RegisterUserController,
    LoginUserController,
    LogoutUserController,
    RefreshTokenController,
    ForgotPasswordController,
    GoogleLoginController,
    GetUserController,
    UpdateUserController,
  ],
  providers: [
    RegisterUserService,
    LoginUserService,
    LogoutUserService,
    SendWelcomeEmailHandler,
    UserRepositoryImpl,
    JwtStrategy,
    GoogleStrategy,
    RefreshTokenService,
    SendEmailOtpHandler,
    ForgotPasswordUserService,
    VerifyOTPService,
    ResetPasswordService,
    UserPasswordResetHandler,
    ResendOTPService,
    GoogleLoginService,
    GetUserService,
    CacheService,
    UpdateUserService,
  ],
  exports: [UserRepositoryImpl, CacheService],
})
export class AuthModule {}
