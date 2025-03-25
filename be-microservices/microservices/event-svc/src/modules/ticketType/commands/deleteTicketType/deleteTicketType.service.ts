import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteTicketTypeRepository } from '../../repositories/deleteTicketType.repository';

@Injectable()
export class DeleteTicketTypeService {
  constructor(private readonly deleteTicketTypeRepository: DeleteTicketTypeRepository) {}

  async execute(id: string, userId: string): Promise<Result<string, Error>> {
    try {
      const isAuthor = await this.deleteTicketTypeRepository.checkAuthor(id, userId);
      if (isAuthor.isErr()) {
        return Err(new Error('Failed to check author'));
      }
      if (!isAuthor.unwrap()) {
        return Err(new Error('Unauthorized'));
      }
      const result = await this.deleteTicketTypeRepository.deleteTicketType(id);
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