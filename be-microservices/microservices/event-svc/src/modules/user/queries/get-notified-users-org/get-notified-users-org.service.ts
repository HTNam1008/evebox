import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../../repositories/userFavorite.repository';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class GetUsersNotifiedByOrgService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(orgId: string): Promise<Result<{ userId: string }[], Error>> {
    try {
      const result = await this.favoriteRepository.getUsersNotifiedByOrganizer(orgId);
      return Ok(result);
    } catch (error) {
      return Err(new Error('Failed to fetch notified users for organizer'));
    }
  }
}
