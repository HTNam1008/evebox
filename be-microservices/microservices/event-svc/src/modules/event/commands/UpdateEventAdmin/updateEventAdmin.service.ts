import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateEventAdminRepository } from '../../repositories/updateEventAdmin.repository';
import { UpdateEventAdminDto } from './updateEventAdmin.dto';
import { EventDto } from './updateEventAdmin-response.dto';

@Injectable()
export class UpdateEventAdminService {
  constructor(
    private readonly updateEventRepository: UpdateEventAdminRepository) {}

  async execute(dto: UpdateEventAdminDto, id: number, email: string): Promise<Result<EventDto, Error>> {
    try {
      const eventResult = await this.updateEventRepository.updateEvent(dto, id, email);
      if (eventResult.isErr()) {
        return Err(new Error('Failed to update event'));
      }

      return Ok(eventResult.unwrap());
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to update event'));
    }
  }
}