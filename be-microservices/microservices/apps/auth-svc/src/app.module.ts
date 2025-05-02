import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './infrastructure/adapters/cloudinary/cloudinary.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService globally available
      envFilePath: '.env', // Path to .env file
    }),
    PrismaModule,
    CqrsModule,
    CloudinaryModule,
    AuthModule,
    ImagesModule,
  ],
})

export class AppModule {}
