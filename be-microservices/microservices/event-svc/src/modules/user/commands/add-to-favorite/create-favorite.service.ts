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
      await this.favoriteRepository.addFavorite(userId, dto.itemType, dto.itemId);
      return Ok(true);
    } catch {
      return Err(new Error('Failed to add favorite'));
    }
  }
}
