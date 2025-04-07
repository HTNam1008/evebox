import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class getRedisSeatRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getSeatInfo(showingId: string, seatId: number[]){
    try{
      const showing = await this.prisma.showing.findUnique({
        where: {
          id: showingId,
          deleteAt: null,
        },
        select: {
          seatMapId: true,
          TicketType: {
            select: {
              id: true,
              price: true,
            }
          }
        }
      });
      if(!showing){
        return null;
      }
      const seatMap = await this.prisma.seatmap.findUnique({
        where: {
          id: showing.seatMapId
        },
        select: {
          Section: {
            select: {
              id: true,
              Row: {
                select: {
                  Seat: {
                    select: {
                      id: true,
                    }
                  }
                }
              }
            }
          }
        }
      });
      if(!seatMap){
        return null;
      }
      const sectionId = seatMap.Section.filter((item) => {
        if(item.Row.find((row) => row.Seat.find((seat) => seatId.includes(seat.id)) !== undefined)){
          return item.id;
        }
      });

      if(sectionId.length !== 1){
        return null;
      }

      const ticketTypeId = await this.prisma.ticketTypeSection.findFirst({
        where: {
          sectionId: sectionId[0]?.id,
          ticketTypeId: {
            in: showing.TicketType.map((item) => item.id)
          }
        },
        select: {
          ticketTypeId: true,
        }
      });

      if (!ticketTypeId) {
        return null;
      }

      const ticketType = await this.prisma.ticketType.findUnique({
        where: {
          id: ticketTypeId.ticketTypeId
        },
        select: {
          price: true,
          showingId: true,
          name: true,
        }
      });

      return{
        ticketName: ticketType.name,
        totalPrice: ticketType.price * seatId.length,
        ticketPrice: ticketType.price,
      }

    }
    catch(error){
      console.error(error);
      return null;
    }
  }

  async getTicketTypeInfo(ticketTypeId: string, quantity: number){
    try{
      if(quantity === 0){
        return null;
      }
      const ticketType = await this.prisma.ticketType.findUnique({
        where: {
          id: ticketTypeId,
          deleteAt: null,
        },
        select: {
          price: true,
          showingId: true,
          name: true,
        }
      });
      return {
        ticketName: ticketType.name,
        totalPrice: ticketType.price * quantity,
        ticketPrice: ticketType.price
      };
    }
    catch(error){
      console.error(error);
      return null;
    }
  }
}