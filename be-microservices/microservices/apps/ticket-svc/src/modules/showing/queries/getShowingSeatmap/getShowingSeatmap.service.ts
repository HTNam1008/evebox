import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getShowingSeatmapRepository } from '../../repositories/getShowingSeatmap.repository';
import { SeatMap } from '../../domain/entities/seatmap.entity';

@Injectable()
export class getShowingSeatmapService {
  constructor(
    private readonly getShowingSeatmapRepository: getShowingSeatmapRepository,
  ) {}

  async getSeatMap(showingId: string): Promise<Result<SeatMap, Error>> {
    try {
      const seatMap = await this.getShowingSeatmapRepository.getSeatmap(showingId);
      if (!seatMap) {
        return Err(new Error('Seat map not found.'));
      }
      // const ticketTypeIds = await this.getShowingSeatmapRepository.getSectionTicketTypeIds(showingId);
      // if (!ticketTypeIds) {
      //   return Err(new Error('Failed to fetch ticket type IDs.'));
      // }
      
      return Ok(seatMap);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch seat map data.'));
    }
  }

}