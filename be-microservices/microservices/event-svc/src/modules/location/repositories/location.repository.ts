import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";

@Injectable()
export class LocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { street: string; ward: string; districtId: number }) {
    const location = await this.prisma.locations.findFirst({
      where: {
        street: data.street,
        ward: data.ward,
        districtId: data.districtId >> 0,
      },
    });
    if (location) {
      return location;
    }
    return this.prisma.locations.create({
      data: {
        street: data.street,
        ward: data.ward,
        districts: {
          connect: { id: data.districtId >> 0 },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.locations.findMany();
  }

  async findById(id: number) {
    return this.prisma.locations.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<{ street: string; ward: string; districtId: number }>) {
    return this.prisma.locations.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.locations.delete({ where: { id } });
  }
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: { role_id: true },
    });
  }

  async getAllLocations(organizerId?: string, provinceId?: number) {
    let locationIds: number[] | undefined;
  
    // Get locations from organizerId → via Events table
    if (organizerId) {
      const events = await this.prisma.events.findMany({
        where: { organizerId },
        select: { locationId: true },
      });
  
      locationIds = events
        .map(e => e.locationId)
        .filter(id => id !== null) as number[];
  
      if (locationIds.length === 0) return [];
    }
  
    const locations = await this.prisma.locations.findMany({
      where: {
        ...(locationIds
          ? { id: { in: locationIds } }
          : {}),
        ...(provinceId
          ? {
              districts: {
                provinceId: provinceId,
              },
            }
          : {}),
      },
      include: {
        districts: {
          include: {
            province: true,
          },
        },
      },
    });
  
    return locations.map(loc => ({
      id: loc.id,
      street: loc.street,
      ward: loc.ward,
      district: loc.districts.name,
      province: loc.districts.province.name,
    }));
  }
}
