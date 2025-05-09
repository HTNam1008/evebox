/* Package System */
import { Get, Module } from '@nestjs/common';

import { LocationService } from './commands/location.service';
import { LocationRepository } from './repositories/location.repository';
import { GetAllDistrictsController } from './queries/getAllDistricts.controller';
import { GetAllDistrictsService } from './queries/getAllDistricts.service';
import { DistrictsRepository } from './repositories/districts.repository';
import { GetAllLocationsController } from './queries/getAllLocations/getAllLocation.controller';
import { GetAllLocationsService } from './queries/getAllLocations/getAllLocation.service';
import { GetOrgLocationsController } from './queries/getOrgLocations/getOrgLocations.controller';
import { GetOrgLocationsService } from './queries/getOrgLocations/getOrgLocations.service';

@Module({
  controllers: [
    GetAllDistrictsController,
    GetAllLocationsController,
    GetOrgLocationsController
  ],
  providers: [LocationService, LocationRepository,
    GetAllDistrictsService,
    DistrictsRepository,
    GetAllLocationsService,
    GetOrgLocationsService
  ],
  exports: [LocationService],
})

export class LocationModule {}