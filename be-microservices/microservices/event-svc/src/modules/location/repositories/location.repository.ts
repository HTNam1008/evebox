import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";

@Injectable()
export class LocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { street: string; ward: string; provinceId: number; districtId: number }) {
    const location = await this.prisma.locations.findFirst({
      where: {
        street: data.street,
        ward: data.ward,
        districtId: data.districtId,
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
          connect: { id: data.districtId },
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
}
