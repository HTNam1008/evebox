import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { ImageController } from './images.controller';

@Global()
@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ImageController],
  providers: [
    // {
    //   provide: 'APP_GUARD',
    //   useClass: JwtAuthGuard,
    // },
    /* {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    }, */
    JwtStrategy,
  ]
})
export class ImageModule {}
