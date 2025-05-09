import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';

@Injectable()
export class UnfavoriteOrgService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(userEmail: string, orgId: string): Promise<Result<boolean, Error>> {
    const userId = await this.favoriteRepository.getUserIdByEmail(userEmail);
    if (!userId) {
      return Err(new Error('User not found'));
    }

    const exists = await this.favoriteRepository.findByUserIdAndOrgId(userId, orgId);
    if (!exists) {
      return Err(new Error('Favorite record not found for this event'));
    }

    try {
      await this.favoriteRepository.updateFavoriteStatus(exists.id,false);
      return Ok(true);
    } catch (error) {
      return Err(new Error(error.message || 'Failed to unfavorite event'));
    }
  }
}
