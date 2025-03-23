import { Injectable } from '@nestjs/common';
import { UpdateShowingRepository } from '../../repositories/updateShowing.repository';
import { UpdateShowingDto } from './updateShowing.dto';
import { Result, Err } from 'oxide.ts';

@Injectable()
export class UpdateShowingService {
  constructor(private readonly updateShowingRepository: UpdateShowingRepository) {}

  async updateShowing(dto: UpdateShowingDto): Promise<Result<string, Error>> {
    try {
      // If both startTime and endTime are provided, validate their order
      if (dto.startTime && dto.endTime && new Date(dto.endTime) <= new Date(dto.startTime)) {
        return Err(new Error('End time must be greater than start time'));
      }
      return await this.updateShowingRepository.updateShowing(dto);
    } catch (error) {
      return Err(new Error('Failed to update showing'));
    }
  }
}