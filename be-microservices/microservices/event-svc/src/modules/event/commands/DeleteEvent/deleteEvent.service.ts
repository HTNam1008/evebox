import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteEventRepository } from '../../repositories/deleteEvent.repository';

@Injectable()
export class DeleteEventService {
  constructor(
    private readonly deleteEventRepository: DeleteEventRepository,
  ) {}

  async execute(id: number, userId: string): Promise<Result<number, Error>> {
    try {
      const isAuthor = await this.deleteEventRepository.checkAuthor(id, userId);
      if (isAuthor.isErr()) {
        return Err(new Error('Failed to check author'));
      }
      if (!isAuthor.unwrap()) {
        return Err(new Error('Unauthorized'));
      }

      const result = await this.deleteEventRepository.deleteEvent(id);
      if (result.isErr()) {
        return Err(new Error('Failed to delete event'));
      }
      return Ok(result.unwrap());
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to delete event'));
    }
  }
}