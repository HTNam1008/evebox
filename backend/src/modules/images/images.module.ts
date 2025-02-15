import { Module } from '@nestjs/common';
import { ImagesService } from './commands/images/images.service';
import { ImagesController } from './commands/images/images.controller';
import { ImagesRepository } from './repositories/images.repository';
import { CloudinaryModule } from '../../infrastructure/adapters/cloudinary/cloudinary.module';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository, PrismaService],
  exports: [ImagesService],
})
export class ImagesModule {}
