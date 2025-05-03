import { Injectable } from "@nestjs/common";
import { LocationRepository } from "../../repositories/location.repository";
import { Err, Ok, Result } from "oxide.ts";
import { GetAllLocationsResponseDto } from "./getAllLocation-response.dto";

@Injectable()
export class GetAllLocationsService {
  constructor(private readonly locationsRepository: LocationRepository) {}

  async getAllLocations(email: string, organizerId?: string, provinceId?: number): Promise<Result<GetAllLocationsResponseDto, Error>> {
    const user = await this.locationsRepository.findUserByEmail(email);
    if (!user || user.role_id !== 1) {
      return Err(new Error('Access denied. Admins only.'));
    }
    try {
      const locations = await this.locationsRepository.getAllLocations(organizerId,provinceId);
      return Ok({
        statusCode: 200,
        message: 'Locations retrieved successfully',
        data: locations,
      });
    } catch (error) {
      return Err(new Error('Failed to retrieve locations'));
    }
  }
}
