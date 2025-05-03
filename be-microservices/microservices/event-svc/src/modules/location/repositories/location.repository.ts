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

  async getAllLocations() {
    const locations = await this.prisma.locations.findMany({
      select: {
        id: true,
        street: true,
        ward: true,
        districts: {
          select: {
            name: true,
            province: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Transforming to flat structure
    return locations.map((location) => ({
      id: location.id,
      street: location.street,
      ward: location.ward,
      district: location.districts.name,
      province: location.districts.province.name,
    }));
  }
}
