import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteEventDto } from '../commands/DeleteEvent/deleteEvent.dto';

@Injectable()
export class DeleteEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteEvent(id: number): Promise<Result<number, Error>> {
    try {
      // Optionally delete related event categories first
      await this.prisma.eventCategories.deleteMany({
        where: { eventId: id },
      });

      const event = await this.prisma.events.delete({
        where: { id },
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