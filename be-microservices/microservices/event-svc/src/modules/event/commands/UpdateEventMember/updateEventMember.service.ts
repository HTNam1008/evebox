import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateEventMemberDto } from './updateEventMember.dto';
import { UpdateEventMemberResponseDto } from './updateEventMember-response.dto';
import { AddEventMemberRepository } from 'src/modules/event/repositories/addEventMember.repository';

@Injectable()
export class UpdateEventMemberService {
  constructor(private readonly repository: AddEventMemberRepository) {}

  async execute(
    eventId: number,
    dto: UpdateEventMemberDto,
    currentEmail: string,
  ): Promise<Result<UpdateEventMemberResponseDto, Error>> {
    try {
      const event = await this.repository.getEventById(eventId);
      if (!event) return Err(new Error('Event not found'));
      if (event.organizerId !== currentEmail) {
        return Err(new Error('Only organizer can update members'));
      }

      const updated = await this.repository.updateMember(eventId, dto);
      if (!updated) {
        return Err(new Error('Failed to update member'));
      }

      return Ok({
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
      });
    } catch (error) {
      console.error('[UpdateEventMemberService] Error:', error);
      return Err(new Error('Failed to update member'));
    }
  }
}
