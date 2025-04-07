import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";

@Injectable()
export class getFormOfShowingRepository {
  constructor (private readonly prisma: PrismaService) {}

  async getFormOfShowing(showingId: string) {
    const showing = await this.prisma.showing.findUnique({
      where: {
        id: showingId,
        deleteAt: null,
      },
      select: {
        // id: true,
        // eventId: true,
        Form: {
          select: {
            id: true,
            name: true,
            FormInput: {
              select: {
                id: true,
                formId: true,
                fieldName: true,
                type: true,
                required: true,
                regex: true,
                options: true,
              }
            }
          }
        }
      }
    });

    if (!showing) {
      return null;
    }

    return showing.Form;
  }
}