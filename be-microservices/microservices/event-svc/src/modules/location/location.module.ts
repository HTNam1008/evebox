/* Package System */
import { Get, Module } from '@nestjs/common';

import { LocationService } from './commands/location.service';
import { LocationRepository } from './repositories/location.repository';
import { GetAllDistrictsController } from './queries/getAllDistricts.controller';
import { GetAllDistrictsService } from './queries/getAllDistricts.service';
import { DistrictsRepository } from './repositories/districts.repository';
import { GetAllLocationsController } from './queries/getAllLocations/getAllLocation.controller';
import { GetAllLocationsService } from './queries/getAllLocations/getAllLocation.service';

@Module({
  controllers: [
    GetAllDistrictsController,
    GetAllLocationsController
  ],
  providers: [LocationService, LocationRepository,
    GetAllDistrictsService,
    DistrictsRepository,
    GetAllLocationsService,
    
  ],
  exports: [LocationService],
})

export class LocationModule {}