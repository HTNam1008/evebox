import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { ShowingRepository } from '../../repositories/showing.repository';
import { ShowingData } from '../../domain/entities/showing.entity';

@Injectable()
export class ShowingService {
  constructor(private readonly showingRepository: ShowingRepository) {}

  async execute(showingId: string): Promise<Result<ShowingData, Error>> {
    try {
      const showing = await this.showingRepository.getShowingDetail(showingId);
      if (!showing) {
        return Err(new Error('Showing not found.'));
      }
      return Ok(showing);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch showing data.'));
    }
  }
}