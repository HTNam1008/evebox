import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthController } from './auth.controller';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
// import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from './auth.pb';
// import { AuthService } from './auth.service';

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
    /* ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: AUTH_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/auth.proto',
        },
      },
    ]), */
  ],
  controllers: [AuthController],
  // providers: [AuthService],
  // exports: [AuthService],
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
export class AuthModule {}
