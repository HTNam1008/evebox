import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { GetUserController } from '../user/queries/get-user/get-user.controller';
import { GetUserService } from '../user/queries/get-user/get-user.service';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {UserRepositoryImpl} from '../user/repositories/user.repository.impl';

@Module({
    imports: [
        ConfigModule,
        CqrsModule,
      ],
  controllers: [GetUserController],
  providers: [GetUserService, PrismaService, UserRepositoryImpl],
})
export class UserModule {}