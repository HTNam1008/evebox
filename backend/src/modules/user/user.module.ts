// src/modules/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserController } from './commands/register-user/register-user.controller';
import { RegisterUserService } from './commands/register-user/register-user.service';
import { AuthenticateUserController } from './commands/authenticate-user/authenticate-user.controller';
import { AuthenticateUserService } from './commands/authenticate-user/authenticate-user.service';
import { UserRepository } from './repositories/user.repository';
import { UserOrmEntity } from 'src/infrastructure/database/orm/user.orm-entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [RegisterUserController, AuthenticateUserController],
  providers: [
    RegisterUserService,
    AuthenticateUserService,
    UserRepository,
    JwtStrategy,
  ],
  exports: [UserRepository],
})
export class UserModule {}
