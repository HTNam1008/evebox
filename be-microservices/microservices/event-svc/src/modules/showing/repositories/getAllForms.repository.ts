import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class GetAllFormsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getAllForms(): Promise<any> {
    const forms = await this.prisma.form.findMany({
      where: {
        deleteAt: null,
        // OR: [
        //   { createdBy: organizerId },
        // ],
      },
      select: {
        id: true,
        name: true,
        createdBy: true,
        FormInput: {
          select: {
            id: true,
            fieldName: true,
            type: true,
            required: true,
            regex: true,
            options: true,
          }
        },
      },
      take: 5,
      orderBy: { createdAt: 'desc' },
      });
    return forms;
  }
}