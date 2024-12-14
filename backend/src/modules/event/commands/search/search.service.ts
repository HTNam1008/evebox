import { Injectable } from '@nestjs/common';
import { EventSearchRepository } from '../../repositories/event-search.repository';
import { Result, Ok, Err } from 'oxide.ts';
import { EventSearchData } from '../../domain/entities/event.entity';

@Injectable()
export class SearchService {
  constructor(private readonly eventSearchRepository: EventSearchRepository) {}

  async execute(title: string): Promise<Result<EventSearchData[], Error>> {
    try {
      const searchResult = await this.eventSearchRepository.getEventsByTitle(title);

      const formattedResult: EventSearchData[] = searchResult.map(event => ({
        id: event.id,
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        lastScore: event.lastScore,
        Images_Events_imgLogoIdToImages: event.Images_Events_imgLogoIdToImages, // Giữ tên đúng với interface
        Images_Events_imgPosterIdToImages: event.Images_Events_imgPosterIdToImages, // Giữ tên đúng với interface
        categories: event.EventCategories.map(category => ({
          id: category.Categories.id,
          name: category.Categories.name,
        })),
      }));

      return Ok(formattedResult);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch search data.'));
    }
  }
}