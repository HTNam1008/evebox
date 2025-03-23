import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteShowingRepository } from '../../repositories/deleteShowing.repository';
import { DeleteShowingDto } from './deleteShowing.dto';

@Injectable()
export class DeleteShowingService {
  constructor(private readonly deleteShowingRepository: DeleteShowingRepository) {}

  async execute(dto: DeleteShowingDto): Promise<Result<string, Error>> {
    try {
      const result = await this.deleteShowingRepository.deleteShowing(dto.id);
      if (result.isErr()) {
        return Err(new Error('Failed to delete showing'));
      }
      return Ok(result.unwrap());
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to delete showing'));
    }
  }
}