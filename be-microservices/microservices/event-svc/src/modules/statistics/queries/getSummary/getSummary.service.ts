import { Injectable } from '@nestjs/common';
import { GetEventSummaryRepository } from '../../repositories/getSummary.repository';
import { SummaryQueryDto } from './getSummary.dto';
import { EventSummaryData } from './getSummary-response.dto';
import { Err, Result, Ok } from 'oxide.ts';

@Injectable()
export class GetEventSummaryService {
  constructor(private readonly getEventSummaryRepository: GetEventSummaryRepository) {}

  async getEventSummary(eventId: number, dto: SummaryQueryDto, organizerId: string): Promise<Result<EventSummaryData, Error>> {
    try {
      if (!eventId || isNaN(eventId)) {
        return Err(new Error('Event not found'));
      }

      if (!organizerId) {
        return Err(new Error('Unauthorized user'));
      }

      const result = await this.getEventSummaryRepository.getEventSummary(eventId, dto, organizerId);

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