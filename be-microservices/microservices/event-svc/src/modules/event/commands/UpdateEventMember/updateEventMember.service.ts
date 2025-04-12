import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { UpdateEventMemberDto } from './updateEventMember.dto';
import { UpdateEventMemberResponseDto } from './updateEventMember-response.dto';
import { AddEventMemberRepository } from 'src/modules/event/repositories/addEventMember.repository';

@Injectable()
export class UpdateEventMemberService {
  constructor(private readonly repository: AddEventMemberRepository) {}

  async execute(eventId: number, dto: UpdateEventMemberDto, currentEmail: string): Promise<UpdateEventMemberResponseDto> {
    const event = await this.repository.getEventById(eventId);
    if (!event) throw new NotFoundException('Event not found');
    if (event.organizerId !== currentEmail) throw new ForbiddenException('Only organizer can update members');

    const updated = await this.repository.updateMember(eventId, dto);

    return {
      statusCode: 200,
      message: 'Member updated successfully',
      data: {
        eventId: updated.eventId,
        userId: updated.userId,
        email: updated.email,
        role: updated.role,
        role_desc: updated.role_desc,
        createdAt: updated.createdAt,
      },
    };
  }
}
