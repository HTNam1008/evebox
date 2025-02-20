import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { LocationRepository } from '../repositories/location.repository';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async createLocation(street: string, ward: string, provinceId: number, districtId: number) {
    return this.locationRepository.create({ street, ward, provinceId, districtId });
  }

  async getAllLocations() {
    return this.locationRepository.findAll();
  }

  async getLocationById(id: number) {
    return this.locationRepository.findById(id);
  }

  async updateLocation(id: number, data: Partial<{ street: string; ward: string; districtId: number }>) {
    return this.locationRepository.update(id, data);
  }

  async deleteLocation(id: number) {
    return this.locationRepository.delete(id);
  }
}