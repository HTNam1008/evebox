import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class GetFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getFormById(id: number): Promise<any> {
    return this.prisma.form.findFirst({
      where: { id, deleteAt: null },
      include: { FormInput: true },
    });
  }
}