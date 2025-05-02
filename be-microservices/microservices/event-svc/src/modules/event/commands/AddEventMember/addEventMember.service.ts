import { Injectable } from '@nestjs/common';
import { AddEventMemberDto } from './addEventMember.dto';
import { AddEventMemberResponseDto } from './addEventMember-response.dto';
import { AddEventMemberRepository } from 'src/modules/event/repositories/addEventMember.repository';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class AddEventMemberService {
  constructor(private readonly repository: AddEventMemberRepository) {}

  async execute(
    eventId: number,
    dto: AddEventMemberDto,
    currentEmail: string,
  ): Promise<Result<AddEventMemberResponseDto, Error>> {
    try {
      const event = await this.repository.getEventById(eventId);
      if (!event) {
        return Err(new Error(`Event with id ${eventId} not found`));
      }
      const canManage = await this.repository.hasPermissionToManageMembers(eventId, currentEmail);

      if (!canManage) {
        return Err(new Error('You do not have permission to manage members.'));
      }

      const created = await this.repository.addMember(eventId, dto);

      return Ok({
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
      });
    } catch (error) {
      console.error('[AddEventMemberService] Failed to add member:', error);
      return Err(new Error('Failed to add member to event'));
    }
  }
}
