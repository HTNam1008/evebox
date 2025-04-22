import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import e from 'express';
import { ShowingTimeResponseDto } from '../queries/getAllShowingTimeOfEvent/getAllShowingTimeOfEvent-response.dto';

@Injectable()
export class GetAllShowingTimeOfEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllShowingTimeOfEvent(eventId: number): Promise<Result<ShowingTimeResponseDto[], Error>> {
    try {
      const showings = await this.prisma.showing.findMany({
        where: { eventId: eventId >> 0,
          deleteAt: null 
         },
        select: {
          id: true,
          startTime: true,
          endTime: true,
        },
      });
      return Ok(showings);
    } catch (error) {
      return Err(new Error('Failed to get showings'));
    }
  }
}