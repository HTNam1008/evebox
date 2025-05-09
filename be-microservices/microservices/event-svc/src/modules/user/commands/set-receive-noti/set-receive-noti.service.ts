import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';

@Injectable()
export class SetReceiveNotiService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(email: string, receive: boolean): Promise<Result<boolean, Error>> {
    try {
      const userId = await this.favoriteRepository.getUserIdByEmail(email);
      if (!userId) return Err(new Error('User not found'));

      await this.favoriteRepository.updateReceiveNoti(userId, receive);
      return Ok(true);
    } catch {
      return Err(new Error('Failed to update notification preference'));
    }
  }
}
