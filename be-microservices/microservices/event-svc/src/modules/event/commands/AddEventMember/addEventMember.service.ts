import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AddEventMemberDto } from './addEventMember.dto';
import { AddEventMemberResponseDto } from './addEventMember-response.dto';
import { AddEventMemberRepository } from 'src/modules/event/repositories/addEventMember.repository';

@Injectable()
export class AddEventMemberService {
  constructor(private readonly repository: AddEventMemberRepository) {}

  async execute(eventId: number, dto: AddEventMemberDto, currentEmail: string): Promise<AddEventMemberResponseDto> {
    const event = await this.repository.getEventById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }
  
    if (event.organizerId !== currentEmail) {
      throw new ForbiddenException('Only the organizer can add members to this event');
    }
  
    const created = await this.repository.addMember(eventId, dto);

    return {
      statusCode: 201,
      message: 'Member added successfully',
      data: {
        eventId: created.eventId,
        userId: created.userId,
        email: created.email,
        role: created.role,
        role_desc: created.role_desc,
        createdAt: created.createdAt,
      },
    };
  }
}
