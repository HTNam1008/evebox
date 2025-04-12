import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { GetEventMembersQueryDto } from '../../queries/getEventMember/getEventMembers.query.dto';
import { GetEventMembersResponseDto } from './getEventMembers-response.dto';

@Injectable()
export class GetEventMembersService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(eventId: number, currentEmail: string, query: GetEventMembersQueryDto): Promise<GetEventMembersResponseDto> {
    const event = await this.prisma.events.findUnique({
      where: { id: eventId },
      select: { organizerId: true },
    });

    if (!event) throw new NotFoundException('Event not found');
    if (event.organizerId !== currentEmail) {
      throw new ForbiddenException('Only organizer can view members');
    }

    const where = {
        eventId,
        isDeleted: false,
        ...(query.email ? { email: query.email } : {}),
      };

    const members = await this.prisma.eventUserRelationship.findMany({ where });

    return {
      statusCode: 200,
      message: 'Success',
      data: members.map(m => ({
        eventId: m.eventId,
        userId: m.userId,
        email: m.email,
        role: m.role,
        role_desc: m.role_desc,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
        isDeleted: m.isDeleted,
      })),
    };
  }
}
