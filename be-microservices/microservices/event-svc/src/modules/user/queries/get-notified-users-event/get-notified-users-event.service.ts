import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class GetUsersNotifiedByEventService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(eventId: number): Promise<Result<{ userId: string }[], Error>> {
    try {
      const result = await this.favoriteRepository.getUsersNotifiedByEvent(eventId);
      return Ok(result);
    } catch (error) {
      return Err(new Error('Failed to fetch notified users'));
    }
  }
}
