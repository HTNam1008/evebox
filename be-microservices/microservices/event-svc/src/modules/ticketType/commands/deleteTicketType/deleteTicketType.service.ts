import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteTicketTypeRepository } from '../../repositories/deleteTicketType.repository';
import { DeleteTicketTypeDto } from './deleteTicketType.dto';

@Injectable()
export class DeleteTicketTypeService {
  constructor(private readonly deleteTicketTypeRepository: DeleteTicketTypeRepository) {}

  async execute(dto: DeleteTicketTypeDto): Promise<Result<string, Error>> {
    try {
      const result = await this.deleteTicketTypeRepository.deleteTicketType(dto.id);
      if (result.isErr()) {
        return Err(new Error('Failed to delete ticket type'));
      }
      return Ok(result.unwrap());
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to delete ticket type'));
    }
  }
}