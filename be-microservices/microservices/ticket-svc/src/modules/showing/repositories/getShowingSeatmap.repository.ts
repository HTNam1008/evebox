import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class getShowingSeatmapRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSeatmap(showingId: string) {
    const seatmapId = await this.prisma.showing.findUnique({
      where: {
        id: showingId,
      },
      select:{
        seatMapId: true,
      }
    });

    if(!seatmapId){
      return null;
    }

    const seatmap = await this.prisma.seatmap.findUnique({
      where: {
        id: seatmapId.seatMapId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        viewBox: true,
        status: true,
        Section: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            seatmapId: true,
            isStage: true,
            element: true,
            attribute: true,
            ticketTypeId: true,
            Row: {
              select: {
                id: true,
                name: true,
                sectionId: true,
                createdAt: true,
                Seat: {
                  select: {
                    id: true,
                    name: true,
                    rowId: true,
                    position: true,
                    positionX: true,
                    positionY: true,
                    createdAt: true,
                    Ticket: {
                      where:{
                        showingId: showingId,
                      }
                      ,select: {
                        status: true,
                      }
                    }
                  },
                },
              },
            },
          },
        },
      },
    });
    return seatmap;
  }
}