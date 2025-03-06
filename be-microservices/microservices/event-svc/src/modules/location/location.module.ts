/* Package System */
import { Module } from '@nestjs/common';

import { LocationService } from './commands/location.service';
import { LocationRepository } from './repositories/location.repository';

@Module({
  providers: [LocationService, LocationRepository],
  exports: [LocationService],
})

export class LocationModule {}