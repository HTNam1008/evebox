import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { CreateFavoriteDto } from './create-favorite.dto';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(dto: CreateFavoriteDto, email: string): Promise<Result<boolean, Error>> {
    const userId = await this.favoriteRepository.getUserIdByEmail(email);
    if (!userId) {
      return Err(new Error('User not found'));
    }

    try {
      const existing = await this.favoriteRepository.findFavorite(userId, dto.itemType, dto.itemId);

      if (existing) {
        if (existing.isFavorite) {

          // Already favorited, do nothing
          return Ok(true);
        } else {
          // Update isFavorite to true
          await this.favoriteRepository.updateFavoriteStatus(existing.id, true);
          return Ok(true);
        }
      }

      // No existing record, add new favorite
      await this.favoriteRepository.addFavorite(userId, dto.itemType, dto.itemId);
      return Ok(true);
    } catch {
      return Err(new Error('Failed to add favorite'));
    }
  }
}
