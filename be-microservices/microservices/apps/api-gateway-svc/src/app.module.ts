import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        timeout: config.get('HTTP_TIMEOUT'),
        maxRedirects: config.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
})
export class AppModule {}
