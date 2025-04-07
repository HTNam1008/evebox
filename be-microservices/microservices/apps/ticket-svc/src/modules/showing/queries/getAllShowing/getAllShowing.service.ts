import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getAllShowingRepository } from '../../repositories/getAllShowing.repository';

@Injectable()
export class getAllShowingService {
  constructor(private readonly getAllShowingRepository: getAllShowingRepository) {}

  async getAllShowings(): Promise<Result<String[], Error>> {
    try {
      const showings = await this.getAllShowingRepository.getAllShowing();
      const formattedResult = showings.map(showing => showing.id);
      return Ok(formattedResult);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch showings data.'));
    }
  }
}