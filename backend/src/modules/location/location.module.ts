/* Package System */
import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { LocationService } from './commands/location.service';
import { LocationRepository } from './repositories/location.repository';

@Module({
  providers: [LocationService, LocationRepository, PrismaService],
  exports: [LocationService, PrismaService],
})

export class LocationModule {}