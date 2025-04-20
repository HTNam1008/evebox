import { Injectable } from '@nestjs/common';
import { GetEventSummaryRepository } from '../../repositories/getSummary.repository';
import { EventSummaryData } from './getSummary-response.dto';
import { Err, Result, Ok } from 'oxide.ts';
import { GetOrdersRepository } from '../../repositories/getOrders.repository';

@Injectable()
export class GetEventSummaryService {
  constructor(
    private readonly getEventSummaryRepository: GetEventSummaryRepository,
    private readonly getOrdersRepository: GetOrdersRepository,
  ) {}

  async getEventSummary(showingId: string, organizerId: string): Promise<Result<EventSummaryData, Error>> {
    try {
      if (!showingId) {
        return Err(new Error('Showing ID is required'));
      }

      if (!organizerId) {
        return Err(new Error('Unauthorized user'));
      }

      const result = await this.getEventSummaryRepository.getEventSummary(showingId, organizerId);

      if(result.isErr()) {
        console.log('error after repo');
        return Err(result.unwrapErr());
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to get event summary'));
    }
  }

}