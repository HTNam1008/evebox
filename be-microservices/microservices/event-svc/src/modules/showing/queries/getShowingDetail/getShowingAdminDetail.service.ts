import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { GetShowingAdminDetailRepository } from '../../repositories/getShowingAdminDetail.repository';
import { ShowingAdminDataDto } from './getShowingAdminDetail-response.dto';

@Injectable()
export class GetShowingAdminDetailService {
  constructor(private readonly getShowingDetailRepository: GetShowingAdminDetailRepository) {}

  async execute(showingId: string, email: string): Promise<Result<ShowingAdminDataDto, Error>> {
    try {
      const showing = await this.getShowingDetailRepository.getShowingDetail(showingId, email);
      if (showing.isErr()) {
        return Err(new Error(showing.unwrapErr().message));
      }
      return Ok(showing.unwrap());
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch showing data.'));
    }
  }

}