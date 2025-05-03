import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../../repositories/location.repository';
import { Result, Ok, Err } from 'oxide.ts';
import { GetOrgLocationsResponseDto } from './getOrgLocations-response.dto';

@Injectable()
export class GetOrgLocationsService {
  constructor(private readonly locationsRepository: LocationRepository) {}

  async getLocationsByOrganizerEmail(email: string): Promise<Result<GetOrgLocationsResponseDto, Error>> {
    try {
      const data = await this.locationsRepository.getLocationsByOrganizerEmail(email);
      return Ok({
        statusCode: 200,
        message: 'Locations retrieved successfully',
        data: data,
      });
    } catch {
      return Err(new Error('Failed to retrieve organizer locations'));
    }
  }
}
