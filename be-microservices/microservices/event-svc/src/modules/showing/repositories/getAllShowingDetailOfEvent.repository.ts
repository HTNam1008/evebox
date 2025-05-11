import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import e from 'express';

@Injectable()
export class GetAllShowingDetailOfEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllShowingDetailOfEvent(eventId: number): Promise<Result<any, Error>> {
    try {
      const showings = await this.prisma.showing.findMany({
        where: { eventId: eventId >> 0,
          deleteAt: null 
         },
        select: {
          id: true,
          startTime: true,
          endTime: true,
          seatMapId: true,
          TicketType: {
            where: { deleteAt: null},
            select: {
              id: true,
              name: true,
              description: true,
              color: true,
              isFree: true,
              originalPrice: true,
              startTime: true,
              endTime: true,
              position: true,
              quantity: true,
              maxQtyPerOrder: true,
              minQtyPerOrder: true,
              imageUrl: true,
              isHidden: true,
            }
          }
        },
      });
      return Ok(showings);
    } catch (error) {
      return Err(new Error('Failed to get showings'));
    }
  }

  async checkAuthor(id: number, userId: string): Promise<Result<boolean, Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: userId },
      })

      if (user && user.role_id === 1) {
        return Ok(true);
      }

      const event = await this.prisma.events.findUnique({
        where: { id: id >> 0 },
        select: { organizerId: true },
      });

      if (event && event.organizerId === userId) {
        return Ok(true);
      }
      return Ok(false);
    } catch (error) {
      return Err(new Error('Failed to check author'));
    }
  }
}