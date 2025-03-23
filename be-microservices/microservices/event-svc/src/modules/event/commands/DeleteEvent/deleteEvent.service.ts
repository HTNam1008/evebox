import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteEventRepository } from '../../repositories/deleteEvent.repository';
import { DeleteEventDto } from './deleteEvent.dto';

@Injectable()
export class DeleteEventService {
  constructor(
    private readonly deleteEventRepository: DeleteEventRepository,
  ) {}

  async execute(dto: DeleteEventDto): Promise<Result<number, Error>> {
    try {
      const result = await this.deleteEventRepository.deleteEvent(dto.id);
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