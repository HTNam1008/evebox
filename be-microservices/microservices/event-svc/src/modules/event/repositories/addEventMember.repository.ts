import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { AddEventMemberDto } from 'src/modules/event/commands/AddEventMember/addEventMember.dto';
import { EventUserRelationship } from '@prisma/client';
import { UpdateEventMemberDto } from '../commands/UpdateEventMember/updateEventMember.dto';

@Injectable()
export class AddEventMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly roleMap = {
    1: 'organizer',
    2: 'administrator',
    3: 'manager',
    4: 'check-in staff',
    5: 'check-out staff',
    6: 'redeem staff',
  };

  async getEventById(eventId: number) {
    return this.prisma.events.findUnique({
      where: { id: eventId },
      select: { id: true, organizerId: true },
    });
  }

  async addMember(eventId: number, dto: AddEventMemberDto): Promise<EventUserRelationship> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${dto.email} not found`);
    }

    const role_desc = this.roleMap[dto.role];
    if (!role_desc) {
      throw new BadRequestException('Invalid role number');
    }

    const existing = await this.prisma.eventUserRelationship.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: user.id,
        },
      },
    });
    
    if (existing) {
      throw new BadRequestException('Already added member');
    }
    
    return this.prisma.eventUserRelationship.create({
      data: {
        eventId,
        userId: user.id,
        email: user.email,
        role: dto.role,
        role_desc,
      },
    });
  }

  async updateMember(eventId: number, dto: UpdateEventMemberDto): Promise<EventUserRelationship> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new NotFoundException(`User with email ${dto.email} not found`);

    const role_desc = this.roleMap[dto.role];
    if (!role_desc) throw new BadRequestException('Invalid role number');

    const existing = await this.prisma.eventUserRelationship.findUnique({
      where: { eventId_userId: { eventId, userId: user.id } },
    });
    if (!existing) throw new NotFoundException('Member not found');

    return this.prisma.eventUserRelationship.update({
      where: { eventId_userId: { eventId, userId: user.id } },
      data: { role: dto.role, role_desc },
    });
  }
}
