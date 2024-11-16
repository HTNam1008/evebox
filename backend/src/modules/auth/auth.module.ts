// src/modules/user/auth.module.ts

import { Module } from '@nestjs/common';
import { RegisterUserController } from './commands/register/register-user.controller';
import { RegisterUserService } from './commands/register/register-user.service';
import { LoginUserController } from './commands/login/login-user.controller';
import { LoginUserService } from './commands/login/login-user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { SendWelcomeEmailHandler } from './domain/events/handler/send-welcome-email.service';
import { EmailModule } from 'src/infrastructure/adapters/email/email.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthRepositoryImpl } from './repositories/auth.repository.impl';
import { LogoutUserController } from './commands/logout/logout-user.controller';
import { LogoutUserService } from './commands/logout/logout-user.service';
import { RefreshTokenService } from './commands/refesh-token/refresh-token.service';
import { RefreshTokenController } from './commands/refesh-token/refresh-token.controller';

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
  ],
  controllers: [RegisterUserController, LoginUserController, LogoutUserController, RefreshTokenController],
  providers: [
    PrismaService,
    RegisterUserService,
    LoginUserService,
    LogoutUserService,
    SendWelcomeEmailHandler,
    AuthRepositoryImpl,
    JwtStrategy,
    RefreshTokenService
  ],
  exports: [AuthRepositoryImpl],
})
export class AuthModule {}
