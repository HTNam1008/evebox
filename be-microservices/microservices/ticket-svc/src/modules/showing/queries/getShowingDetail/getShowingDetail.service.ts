import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getShowingDetailRepository } from '../../repositories/getShowingDetail.repository';
import { ShowingData } from '../../domain/entities/showing.entity';

@Injectable()
export class getShowingDetailService {
  constructor(private readonly getShowingDetailRepository: getShowingDetailRepository) {}

  async execute(showingId: string): Promise<Result<ShowingData, Error>> {
    try {
      const showing = await this.getShowingDetailRepository.getShowingDetail(showingId);
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