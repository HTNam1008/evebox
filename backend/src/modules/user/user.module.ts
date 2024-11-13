// src/modules/user/user.module.ts

import { Module } from '@nestjs/common';
import { RegisterUserController } from './commands/register-user/register-user.controller';
import { RegisterUserService } from './commands/register-user/register-user.service';
import { AuthenticateUserController } from './commands/authenticate-user/authenticate-user.controller';
import { AuthenticateUserService } from './commands/authenticate-user/authenticate-user.service';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { SendWelcomeEmailHandler } from './domain/events/handler/send-welcome-email.service';
import { EmailModule } from 'src/infrastructure/adapters/email/email.module';
import { CqrsModule } from '@nestjs/cqrs';

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
  controllers: [RegisterUserController, AuthenticateUserController],
  providers: [
    PrismaService, // Provides PrismaService for injection
    RegisterUserService,
    AuthenticateUserService,
    SendWelcomeEmailHandler,
    UserRepository, // Updated repository to use Prisma
    JwtStrategy,
  ],
  exports: [UserRepository],
})
export class UserModule {}
