import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { GetTicketDetailOfShowingRepository } from '../../repositories/getTicketDetailOfShowing.repository';
import { TicketTypeDetailData } from './getTicketDetailOfShowing-response.dto';

@Injectable()
export class GetTicketDetailOfShowingService {
  constructor(private readonly getTicketDetailOfShowingRepository: GetTicketDetailOfShowingRepository) {}

  async execute(showingId: string, ticketTypeId: string, email: string): Promise<Result<TicketTypeDetailData, Error>> {
    try {
      const result = await this.getTicketDetailOfShowingRepository.getTicketDetailOfShowing(showingId, ticketTypeId, email);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch ticket detail of showing data.'));
    }
  }
}