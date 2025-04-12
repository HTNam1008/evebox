import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class DeleteEventMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(eventId: number, currentEmail: string, targetEmail: string) {
    const event = await this.prisma.events.findUnique({
      where: { id: eventId },
      select: { organizerId: true },
    });

    if (!event) throw new NotFoundException('Event not found');
    if (event.organizerId !== currentEmail) {
      throw new ForbiddenException('Only the organizer can delete members');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: targetEmail },
    });

    if (!user) throw new NotFoundException('Target user not found');

    const existing = await this.prisma.eventUserRelationship.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: user.id,
        },
      },
    });

    if (!existing) throw new NotFoundException('Member not found');

    if (existing.isDeleted) {
      throw new BadRequestException('Member already deleted');
    }

    await this.prisma.eventUserRelationship.update({
      where: {
        eventId_userId: {
          eventId,
          userId: user.id,
        },
      },
      data: { isDeleted: true },
    });

    return {
      statusCode: 200,
      message: 'Member soft deleted successfully',
    };
  }
}
