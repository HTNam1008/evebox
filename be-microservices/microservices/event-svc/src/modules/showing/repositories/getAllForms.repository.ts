import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class GetAllFormsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getAllForms(organizerEmail: string): Promise<any> {
    const fixedFormIds = [12608, 12472, 12404, 12518, 12500];
    const forms = await this.prisma.form.findMany({
      where: {
        deleteAt: null,
        OR: [
          { id: { in: fixedFormIds } },
          { createdBy: organizerEmail }
        ]
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
      orderBy: { createdAt: 'desc' },
      });
    return forms;
  }
}