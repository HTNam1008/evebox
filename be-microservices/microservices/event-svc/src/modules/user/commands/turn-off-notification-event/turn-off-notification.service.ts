import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';

@Injectable()
export class TurnOffNotificationServiceForEvent {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(eventId: string, email: string): Promise<Result<boolean, Error>> {
    const userId = await this.favoriteRepository.getUserIdByEmail(email);
    if (!userId) return Err(new Error('User not found'));

    try {
      await this.favoriteRepository.turnOffNotificationForEvent(userId, eventId);
      return Ok(true);
    } catch (error) {
      return Err(error instanceof Error ? error : new Error('Unknown error'));
    }
  }
}
