import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { AddEventMemberDto } from 'src/modules/event/commands/AddEventMember/addEventMember.dto';
import { EventUserRelationship } from '@prisma/client';
import { UpdateEventMemberDto } from '../commands/UpdateEventMember/updateEventMember.dto';
import { GetEventMembersQueryDto } from '../queries/getEventMember/getEventMembers.query.dto';

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
      // If record is soft-deleted, reactivate it
      if (existing.isDeleted) {
        return this.prisma.eventUserRelationship.update({
          where: {
            eventId_userId: {
              eventId,
              userId: user.id,
            },
          },
          data: {
            isDeleted: false,
            role: dto.role,
            role_desc,
          },
        });
      }
      else{
        throw new BadRequestException('Already added member');
      }
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

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getMember(eventId: number, userId: string) {
    return this.prisma.eventUserRelationship.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });
  }

  async softDeleteMember(eventId: number, userId: string) {
    return this.prisma.eventUserRelationship.update({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
      data: {
        isDeleted: true,
      },
    });
  }

  async getEventOrganizer(eventId: number) {
    return this.prisma.events.findUnique({
      where: { id: eventId },
      select: { organizerId: true },
    });
  }

  async getMembers(eventId: number, query: GetEventMembersQueryDto) {
    const where = {
      eventId,
      isDeleted: false,
      ...(query.email ? { email: query.email } : {}),
    };

    return this.prisma.eventUserRelationship.findMany({ where });
  }

  async hasPermissionToManageMembers(eventId: number, userEmail: string): Promise<boolean> {
    // Step 1: Get the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });
  
    if (!user) {
      throw new NotFoundException(`User with email ${userEmail} not found`);
    }
  
    // Step 2: Check if this user is the organizer of the event (they always have permission)
    const event = await this.getEventById(eventId);
    if (event?.organizerId === user.email) {
      return true;
    }
  
    // Step 3: Get user’s role in the event
    const member = await this.getMember(eventId, user.id);
    if (!member || member.isDeleted) {
      return false;
    }
  
    // Step 4: Lookup the role’s permissions in event_role table
    const role = await this.prisma.eventRole.findUnique({
      where: { id: member.role },
    });
  
    if (!role) {
      return false;
    }
  
    // Step 5: Return permission flag
    return role.viewMember;
  }
  
}
