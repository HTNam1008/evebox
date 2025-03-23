import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteShowingDto } from '../commands/DeleteShowing/deleteShowing.dto';

@Injectable()
export class DeleteShowingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteShowing(id: string): Promise<Result<string, Error>> {
    try {
      const showing = await this.prisma.showing.delete({
        where: { id },
      });
      if (showing) {
        return Ok(showing.id);
      }
      return Err(new Error('Showing not found or could not be deleted'));
    } catch (error) {
      return Err(new Error('Failed to delete showing'));
    }
  }
}