import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import e from 'express';

@Injectable()
export class CreateShowingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createShowing(dto: any, eventId: number): Promise<Result<string, Error>> {
    try{
      const event = await this.prisma.events.findUnique({
        where: {
          id: eventId >> 0
        }
      });
      if (!event) {
        return Err(new Error('Event not found'));
      }
      const showing = await this.prisma.showing.create({
        data: {
          status: dto.status,
          startTime: dto.startTime,
          endTime: dto.endTime,
          eventId: eventId >> 0,
          isFree: false,
          isSalable: false,
          isPresale: false,
          seatMapId: 0,
          isEnabledQueueWaiting: false,
          showAllSeats: false,
        }
      });
      if (showing) {
        return Ok(showing.id);
      }
      return Err(new Error('Failed to create showing'));
    } catch (error) {
      return Err(new Error('Failed to create showing'));
    }
  }
}