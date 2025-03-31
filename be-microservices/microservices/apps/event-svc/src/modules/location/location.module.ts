/* Package System */
import { Get, Module } from '@nestjs/common';

import { LocationService } from './commands/location.service';
import { LocationRepository } from './repositories/location.repository';
import { GetAllDistrictsController } from './queries/getAllDistricts.controller';
import { GetAllDistrictsService } from './queries/getAllDistricts.service';
import { DistrictsRepository } from './repositories/districts.repository';

@Module({
  controllers: [GetAllDistrictsController],
  providers: [LocationService, LocationRepository,
    GetAllDistrictsService,
    DistrictsRepository,
  ],
  exports: [LocationService],
})

export class LocationModule {}