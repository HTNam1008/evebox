import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';

@Injectable()
export class GetFavoriteEventService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(email: string): Promise<Result<any[], Error>> {
    const userId = await this.favoriteRepository.getUserIdByEmail(email);
    if (!userId) {
      return Err(new Error('User not found'));
    }

    try {
      const records = await this.favoriteRepository.getFavoriteEvents(userId);
      const events = records.map(r => ({
        ...r.event,
        venue: r.event.venue ?? '',
      }));
      return Ok(events);
    } catch {
      return Err(new Error('Failed to get favorite events'));
    }
  }
}
