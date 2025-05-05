import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AdminRepositoryImpl } from './repositories/admin.repository.impl';
import { LocalStorageModule } from 'src/infrastructure/local-storage/local-storage.module';
import { KafkaModule } from 'src/infrastructure/adapters/kafka/kafka.module';
import { RedisModule, CacheService } from '@evebox/redis';
import { UserCreatedHandler } from './domain/events/consumer/handler/user-created.handler';
import { UserChangeStatusHandler } from './domain/events/producer/handler/user-change-status.handler';
import { UserStatusController } from './commands/user-status/user-status.controller';
import { GetUserController } from './queries/get-users/get-users.controller';
import { UserStatusService } from './commands/user-status/user-status.service';
import { GetUsersService } from './queries/get-users/get-users.service';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    LocalStorageModule,
    KafkaModule,
    RedisModule.register({
      keyPrefix: 'admin:',
    }),
  ],
  controllers: [
    UserStatusController,
    GetUserController,
    UserCreatedHandler
  ],
  providers: [
    UserChangeStatusHandler,
    AdminRepositoryImpl,
    CacheService,
    UserStatusService,
    GetUsersService
  ],
  exports: [AdminRepositoryImpl, CacheService],
})
export class AdminModule {}
