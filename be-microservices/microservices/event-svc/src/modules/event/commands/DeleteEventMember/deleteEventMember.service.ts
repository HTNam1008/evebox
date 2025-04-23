import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { AddEventMemberRepository } from 'src/modules/event/repositories/addEventMember.repository';

@Injectable()
export class DeleteEventMemberService {
  constructor(private readonly repository: AddEventMemberRepository) {}

  async execute(eventId: number, currentEmail: string, targetEmail: string): Promise<Result<{ message: string }, Error>> {
    try {
      const event = await this.repository.getEventById(eventId);
      if (!event) {
        return Err(new Error('Event not found'));
      }

      const canManage = await this.repository.hasPermissionToManageMembers(eventId, currentEmail);

      if (!canManage) {
        return Err(new Error('You do not have permission to manage members.'));
      }

      const user = await this.repository.getUserByEmail(targetEmail);
      if (!user) {
        return Err(new Error('Target user not found'));
      }

      const member = await this.repository.getMember(eventId, user.id);
      if (!member) {
        return Err(new Error('Member not found'));
      }

      if (member.isDeleted) {
        return Err(new Error('Member already deleted'));
      }

      const updated = await this.repository.softDeleteMember(eventId, user.id);
      if (!updated) {
        return Err(new Error('Failed to update member'));
      }

      return Ok({ message: 'Member soft deleted successfully' });
    } catch (error) {
      console.error('[DeleteEventMemberService] Error:', error);
      return Err(new Error('Failed to delete member'));
    }
  }
}
