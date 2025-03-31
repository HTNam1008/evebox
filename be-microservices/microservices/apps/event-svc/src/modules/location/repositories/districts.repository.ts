import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";

@Injectable()
export class DistrictsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllDistricts() {
    return this.prisma.province.findMany(
      {
        select: {
          id: true,
          name: true,
          districts: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    );
  }
}