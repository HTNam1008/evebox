import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { DeleteShowingRepository } from '../../repositories/deleteShowing.repository';

@Injectable()
export class DeleteShowingService {
  constructor(private readonly deleteShowingRepository: DeleteShowingRepository) {}

  async execute(id: string): Promise<Result<string, Error>> {
    try {
      const result = await this.deleteShowingRepository.deleteShowing(id);
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