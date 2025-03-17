import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { IORedisService } from 'src/infrastructure/redis/ioredis.service';

@Injectable()
export class getShowingSeatmapRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ioRedisService: IORedisService,

  ) {}

  async getSeatmap(showingId: string) {
    const seatmapId = await this.prisma.showing.findUnique({
      where: {
        id: showingId,
      },
      select:{
        seatMapId: true,
        TicketType: {
          select: {
            sections: true,
            id: true,
          }
        },
      }
    });

    if(!seatmapId || seatmapId.seatMapId=== 0){
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
            isReservingSeat: true,
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
                    SeatStatus: {
                      where: {
                        showingId: showingId,
                      },
                      select: {
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

    const seatMapHasAnyRows = seatmap.Section.some(section => section.Row.length > 0);
    if (!seatMapHasAnyRows) {
      const ticketTypesStatus = await Promise.all(seatmapId.TicketType.map(ticketType => 
        this.getSectionStatus(ticketType.id)
      ));
      
      return {
        id: seatmap.id,
        name: seatmap.name,
        createdAt: seatmap.createdAt,
        viewBox: seatmap.viewBox,
        status: seatmap.status,
        Section: seatmap.Section.map(section => ({
          id: section.id,
          name: section.name,
          createdAt: section.createdAt,
          seatmapId: section.seatmapId,
          isStage: section.isStage,
          element: section.element,
          attribute: section.attribute,
          ticketTypeId: ticketTypesStatus.find(ticketTypeStatus => ticketTypeStatus.sectionId === section.id)?.ticketTypeId || "",
          status:ticketTypesStatus.find(ticketTypeStatus => ticketTypeStatus.sectionId === section.id)?.status || 0,
          isReservingSeat: section.isReservingSeat,
          Row: section.Row.map(row => ({
            id: row.id,
            name: row.name,
            sectionId: row.sectionId,
            createdAt: row.createdAt,
            Seat: row.Seat.map(seat => ({
              id: seat.id,
              name: seat.name,
              rowId: seat.rowId,
              position: seat.position,
              positionX: new Float32Array([seat.positionX]),
              positionY: new Float32Array([seat.positionY]),
              status: seat.SeatStatus[0]?.status || 1,
            })),
          })),
        })),
      }
    }
    const redis = this.ioRedisService.getClient();
    const seatKey = `seat:${showingId}:*`;
    const seatKeyValues = await redis.keys(seatKey);
    let seatIds = [];
    for (const key of seatKeyValues) {
      const seatId = key.split(':')[2];
      seatIds.push(parseInt(seatId));
    }
    console.log(seatIds);
    return {
      id: seatmap.id,
      name: seatmap.name,
      createdAt: seatmap.createdAt,
      viewBox: seatmap.viewBox,
      status: seatmap.status,
      Section: seatmap.Section.map(section => ({
        id: section.id,
        name: section.name,
        createdAt: section.createdAt,
        seatmapId: section.seatmapId,
        isStage: section.isStage,
        element: section.element,
        attribute: section.attribute,
        ticketTypeId: seatmapId.TicketType.find(ticketType => ticketType.sections[0].sectionId === section.id)?.id || "",
        status: 0,
        isReservingSeat: section.isReservingSeat,
        Row: section.Row.map(row => ({
          id: row.id,
          name: row.name,
          sectionId: row.sectionId,
          createdAt: row.createdAt,
          Seat: row.Seat.map(seat => ({
            id: seat.id,
            name: seat.name,
            rowId: seat.rowId,
            position: seat.position,
            positionX: new Float32Array([seat.positionX]),
            positionY: new Float32Array([seat.positionY]),
            status: seatIds.includes(seat.id) ? 3 : seat.SeatStatus[0]?.status || 1,
          })),
        })),
      })),
    }
  }

  async getSectionTicketTypeIds(showingId: string){
    try{
      const ticketTypeIds = await this.prisma.ticketType.findMany({
        where: {
          showingId: showingId,
        },
        select: {
          sections: {
            select: {
              sectionId: true,
            }
          }
        }
      });
      return ticketTypeIds;
    }
    catch(error){
      console.error(error);
      return null;
    }
  }

  async getSectionStatus(ticketTypeId: string){
    try{
      const ticketTypeQuantity = await this.prisma.ticketType.findUnique({
        where: {
          id: ticketTypeId,
        },
        select: {
          quantity: true,
          startTime: true,
          endTime: true,
          sections: {
            select: {
              sectionId: true,
            }
          }
        },
      });

      const soldQuantity = await this.prisma.ticketQRCode.count({
        where: {
          ticketTypeId: ticketTypeId,
        }
      });

      return {
        ticketTypeId,
        sectionId: ticketTypeQuantity.sections[0].sectionId,
        status: soldQuantity >= ticketTypeQuantity.quantity ? 1 : 2,
      }

    }
    catch (error){
      console.error(error);
      return null;
    }
  }

}