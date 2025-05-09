import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';

@Injectable()
export class GetFavoriteOrgService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(email: string): Promise<Result<{ orgId: string }[], Error>> {
    const userId = await this.favoriteRepository.getUserIdByEmail(email);
    if (!userId) {
      return Err(new Error('User not found'));
    }

    try {
      const orgs = await this.favoriteRepository.getFavoriteOrgs(userId);
      return Ok(orgs);
    } catch {
      return Err(new Error('Failed to get favorite organizers'));
    }
  }
}
