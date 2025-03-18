import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";

@Injectable()
export class ClickEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async postClicks(eventId: number) {
    try{
      const event = await this.prisma.events.update({
        where: { id: eventId },
        data: {
          weekClicks: {
            increment: 1,
          },
          totalClicks: {
            increment: 1,
          },
        },
      });
      if (event) return 1;
      return 0;
    }
    catch (error) {
      return 2;
    }
  }
}