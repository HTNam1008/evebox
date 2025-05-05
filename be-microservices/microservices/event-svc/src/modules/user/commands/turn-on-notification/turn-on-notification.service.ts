import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';
import { TurnOnNotificationDto } from './turn-on-notification.dto';

@Injectable()
export class TurnOnNotificationService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(dto: TurnOnNotificationDto, email: string): Promise<Result<boolean, Error>> {
    const userId = await this.favoriteRepository.getUserIdByEmail(email);
    if (!userId) return Err(new Error('User not found'));

    try {
      await this.favoriteRepository.turnOnNotification(userId, dto.itemType, dto.itemId);
      return Ok(true);
    } catch (error) {
      return Err(error instanceof Error ? error : new Error('Unknown error'));
    }
  }
}
