import { Injectable } from '@nestjs/common';
import { UpdateShowingRepository } from '../../repositories/updateShowing.repository';
import { UpdateShowingDto } from './updateShowing.dto';
import { Result, Err } from 'oxide.ts';

@Injectable()
export class UpdateShowingService {
  constructor(private readonly updateShowingRepository: UpdateShowingRepository) {}

  async updateShowing(dto: UpdateShowingDto, id: string, userId: string): Promise<Result<string, Error>> {
    try {
      const isAuthor = await this.updateShowingRepository.checkAuthor(id, userId);
      if (isAuthor.isErr()) {
        return Err(new Error('Failed to check author'));
      }
      if (!isAuthor.unwrap()) {
        return Err(new Error('Unauthorized'));
      }

      return await this.updateShowingRepository.updateShowing(dto, id);
    } catch (error) {
      return Err(new Error('Failed to update showing'));
    }
  }
}