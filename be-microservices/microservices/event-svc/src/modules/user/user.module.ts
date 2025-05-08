
import { Module } from '@nestjs/common';
import { RegisterUserController } from './commands/register/register-user.controller';
import { RegisterUserService } from './commands/register/register-user.service';
import { LoginUserController } from './commands/login/login-user.controller';
import { LoginUserService } from './commands/login/login-user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { SendWelcomeEmailHandler } from './domain/events/handler/send-welcome-email.service';
import { EmailModule } from 'src/infrastructure/adapters/email/email.module';
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
import { FavoriteController } from './commands/add-to-favorite/create-favorite.controller';
import { FavoriteRepository } from './repositories/userFavorite.repository';
import { FavoriteService } from './commands/add-to-favorite/create-favorite.service';
import { UnfavoriteEventController } from './commands/remove-favorite-event/unfavorite-event.controller';
import { UnfavoriteOrgController } from './commands/remove-favorite-org/unfavorite-org.controller';
import { UnfavoriteOrgService } from './commands/remove-favorite-org/unfavorite-org.service';
import { UnfavoriteEventService } from './commands/remove-favorite-event/unfavorite-event.service';
import { FavoriteOrgController } from './queries/get-favorite-org/get-favorite-org.controller';
import { GetFavoriteEventService } from './queries/get-favorite-events/get-favorite-event.service';
import { GetFavoriteOrgService } from './queries/get-favorite-org/get-favorite-org.service';
import { GetFavoriteController } from './queries/get-favorite-events/get-favorite-event.controller';
import { TurnOnNotificationController } from './commands/turn-on-notification/turn-on-notification.controller';
import { TurnOnNotificationService } from './commands/turn-on-notification/turn-on-notification.service';
import { TurnOffNotificationForEventController } from './commands/turn-off-notification-event/turn-off-notification.controller';
import { TurnOffNotificationForOrgController } from './commands/turn-off-notification-org/turn-off-notification.controller';
import { TurnOffNotificationDto } from './commands/turn-off-notification-org/turn-off-notification.dto';
import { TurnOffNotificationServiceForEvent } from './commands/turn-off-notification-event/turn-off-notification.service';
import { TurnOffNotificationServiceForOrg } from './commands/turn-off-notification-org/turn-off-notification.service';
import { SetReceiveNotiController } from './commands/set-receive-noti/set-receive-noti.controller';
import { SetReceiveNotiService } from './commands/set-receive-noti/set-receive-noti.service';
import { GetUsersNotifiedByEventController } from './queries/get-notified-users-event/get-notified-users-event.controller';
import { GetUsersNotifiedByOrgController } from './queries/get-notified-users-org/get-notified-users-org.controller';
import { GetUsersNotifiedByEventService } from './queries/get-notified-users-event/get-notified-users-event.service';
import { GetUsersNotifiedByOrgService } from './queries/get-notified-users-org/get-notified-users-org.service';

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
    EmailModule,
    LocalStorageModule,
    OtpUtilsModule,
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

    FavoriteController,
    UnfavoriteEventController,
    UnfavoriteOrgController,
    FavoriteOrgController,
    GetFavoriteController,
    TurnOnNotificationController,
    TurnOffNotificationForEventController,
    TurnOffNotificationForOrgController,
    SetReceiveNotiController,
    GetUsersNotifiedByEventController,
    GetUsersNotifiedByOrgController,
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

    FavoriteRepository,
    FavoriteService,
    UnfavoriteOrgService,
    UnfavoriteEventService,
    GetFavoriteEventService,
    GetFavoriteOrgService,
    TurnOnNotificationService,
    TurnOffNotificationServiceForEvent,
    TurnOffNotificationServiceForOrg,
    SetReceiveNotiService,
    GetUsersNotifiedByEventService,
    GetUsersNotifiedByOrgService
  ],
  exports: [UserRepositoryImpl],
})
export class UserModule {}
