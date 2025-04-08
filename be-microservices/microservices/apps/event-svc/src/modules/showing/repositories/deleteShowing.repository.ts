import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class DeleteShowingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteShowing(id: string): Promise<Result<string, Error>> {
    try {
      const showing = await this.prisma.showing.update({
        where: { id },
        data: {
          deleteAt: new Date(),
        }
      });
      if (showing) {
        return Ok(showing.id);
      }
      return Err(new Error('Showing not found or could not be deleted'));
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to delete showing'));
    }
  }

  async checkAuthor(id: string, userId: string): Promise<Result<boolean, Error>> {
    try {
      const showing = await this.prisma.showing.findUnique({
        where: { id: id },
        select: { Events: { select: { organizerId: true } } },
      });

      if ( showing && showing.Events.organizerId === userId) {
        return Ok(true);
      }
      return Ok(false);
    } catch (error) {
      return Err(new Error('Failed to check author'));
    }
  }
}