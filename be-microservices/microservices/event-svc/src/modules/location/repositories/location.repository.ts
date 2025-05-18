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
  const events = await this.prisma.events.findMany({
    where: {
      ...(organizerId ? { organizerId } : {}),
      ...(provinceId
        ? {
            locations: {
              districts: {
                provinceId,
              },
            },
          }
        : {}),
    },
    include: {
      locations: {
        include: {
          districts: {
            include: { province: true },
          },
        },
      },
    },
  });

  const grouped = new Map<string, { organizerId: string; id: number; venues: any[] }>();

  for (const event of events) {
    const loc = event.locations;
    if (!loc || !loc.districts || !loc.districts.province) continue;

    const key = event.organizerId!;
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: event.id,
        organizerId: key,
        venues: [],
      });
    }

    grouped.get(key)!.venues.push({
      street: loc.street,
      ward: loc.ward,
      district: loc.districts.name,
      province: loc.districts.province.name,
      event: {
        title: event.title,
        venue: event.venue,
        orgName: event.orgName,
      },
    });
  }

  return Array.from(grouped.values());
}

  async getLocationsByOrganizerEmail(email: string) {
   const events = await this.prisma.events.findMany({
      where: { organizerId: email },
      select: {
        locationId: true,
        venue: true,
        locations: {
          include: {
            districts: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });

    return events
      .filter(e => e.locationId && e.locations)
      .map(e => ({
        id: e.locations.id,
        street: e.locations.street,
        ward: e.locations.ward,
        district: e.locations.districts.name,
        province: e.locations.districts.province.name,
        venue: e.venue || '',
      }));
  }
}
