import { Injectable } from '@nestjs/common';
import { UpdateShowingRepository } from '../../repositories/updateShowing.repository';
import { UpdateShowingDto } from './updateShowing.dto';
import { Result, Err } from 'oxide.ts';

@Injectable()
export class UpdateShowingService {
  constructor(private readonly updateShowingRepository: UpdateShowingRepository) {}

  async updateShowing(dto: UpdateShowingDto, id: string): Promise<Result<string, Error>> {
    try {
      return await this.updateShowingRepository.updateShowing(dto, id);
    } catch (error) {
      return Err(new Error('Failed to update showing'));
    }
  }
}