import { Injectable } from '@nestjs/common';
import { Err, Result } from 'oxide.ts';
import { GetAllShowingDetailOfEventRepository } from '../../repositories/getAllShowingDetailOfEvent.repository';
import e from 'express';

@Injectable()
export class GetAllShowingDetailOfEventService {
  constructor(private readonly getAllShowingDetailOfEventRepository: GetAllShowingDetailOfEventRepository) {}

  async findAll(organizerId: string, eventId: number): Promise<Result<any[], Error>> {
    try{
      if (!organizerId) {
        return Err(new Error('Organizer ID is required'));
      }
      const isAuthor = await this.getAllShowingDetailOfEventRepository.checkAuthor(eventId, organizerId);
      if (isAuthor.isErr()) {
        return Err(new Error('Failed to check author'));
      }
      if (!isAuthor.unwrap()) {
        return Err(new Error('Unauthorized'));
      }

      return await this.getAllShowingDetailOfEventRepository.getAllShowingDetailOfEvent(eventId);
    } catch (error) {
      return Err(new Error('Failed to retrieve events'));
    }
  }
}
