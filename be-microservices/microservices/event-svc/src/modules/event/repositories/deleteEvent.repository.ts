import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class DeleteEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteEvent(id: number): Promise<Result<number, Error>> {
    try {
      // Optionally delete related event categories first

      const event = await this.prisma.events.update({
        where: { id: id >> 0 },
        data: {
          deleteAt: new Date(),
        },
      });

      if (event) {
        return Ok(event.id);
      }
      return Err(new Error('Event not found or could not be deleted'));
    } catch (error) {
      return Err(new Error('Failed to delete event'));
    }
  }
}