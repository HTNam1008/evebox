// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép sử dụng ConfigService ở mọi nơi
      envFilePath: '.env', // Đường dẫn tới tệp .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as any, // 'postgres'
        host: 'localhost',
        // host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
        synchronize: false, // Không nên dùng synchronize trong môi trường production
        migrations: [__dirname + '/infrastructure/database/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/infrastructure/database/migrations',
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    // Thêm các module khác nếu có
  ],
})
export class AppModule {}
