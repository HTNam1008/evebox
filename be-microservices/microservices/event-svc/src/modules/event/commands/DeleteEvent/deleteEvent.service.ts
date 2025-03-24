import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteEventRepository } from '../../repositories/deleteEvent.repository';

@Injectable()
export class DeleteEventService {
  constructor(
    private readonly deleteEventRepository: DeleteEventRepository,
  ) {}

  async execute(id: number): Promise<Result<number, Error>> {
    try {
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