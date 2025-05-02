import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { Images } from '../domain/entities/images.entity';

@Injectable()
export class ImagesRepository {
  constructor(private prisma: PrismaService) {}

  async create(imageUrl: string, userEmail: string): Promise<Images> {
    return this.prisma.image.create({ data: { imageUrl, userEmail }});
  }

  async findAll(userEmail: string): Promise<Images[]> {
    return this.prisma.image.findMany({ where: { userEmail }, orderBy: { createdAt: 'desc' },});
  }

  async findOne(id: number): Promise<Images | null> {
    return this.prisma.image.findUnique({ where: { id } });
  }

  async update(id: number, imageUrl: string): Promise<Images> {
    return this.prisma.image.update({ where: { id }, data: { imageUrl } });
  }

  async remove(id: number): Promise<Images> {
    return this.prisma.image.delete({ where: { id } });
  }
}
