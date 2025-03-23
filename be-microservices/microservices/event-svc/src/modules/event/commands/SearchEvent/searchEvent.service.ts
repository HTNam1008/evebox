import { Injectable } from '@nestjs/common';
import { SearchEventRepository } from '../../repositories/searchEvent.repository';
import { Result, Ok, Err } from 'oxide.ts';
import { SearchEventResponseDto } from './searchEvent-response.dto';

@Injectable()
export class SearchEventService {
  constructor(private readonly eventSearchRepository: SearchEventRepository) {}

  async execute(title: string, categories: string[],startDate?: string, endDate?: string): Promise<Result<SearchEventResponseDto[], Error>> {
    try {
      const searchResult = await this.eventSearchRepository.getEventsByTitleCategoryAndDate(title,
        categories,
        startDate,
        endDate);

      const formattedResult: SearchEventResponseDto[] = searchResult.map(event => ({
        id: event.id,
        title: event.title,
        startDate: event.startTime,
        lastScore: event.lastScore,
        status: event.status,
        minTicketPrice: event.minTicketPrice,
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