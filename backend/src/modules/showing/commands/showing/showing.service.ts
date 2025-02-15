import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { ShowingRepository } from '../../repositories/showing.repository';
import { ShowingData } from '../../domain/entities/showing.entity';
import { SeatMap } from '../../domain/entities/seatmap.entity';

@Injectable()
export class ShowingService {
  constructor(private readonly showingRepository: ShowingRepository) {}

  async execute(showingId: string): Promise<Result<ShowingData, Error>> {
    try {
      const showing = await this.showingRepository.getShowingDetail(showingId);
      if (!showing) {
        return Err(new Error('Showing not found.'));
      }
      return Ok(showing);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch showing data.'));
    }
  }

  async getSeatMap(showingId: string): Promise<Result<SeatMap, Error>> {
    try {
      const seatMap = await this.showingRepository.getSeatmap(showingId);
      if (!seatMap) {
        return Err(new Error('Seat map not found.'));
      }
      const formattedResult: SeatMap = {
        id: seatMap.id,
        name: seatMap.name,
        createdAt: seatMap.createdAt,
        viewBox: seatMap.viewBox,
        status: seatMap.status,
        Section: seatMap.Section.map(section => ({
          id: section.id,
          name: section.name,
          createdAt: section.createdAt,
          seatmapId: section.seatmapId,
          isStage: section.isStage,
          element: section.element,
          attribute: section.attribute,
          ticketTypeId: section.ticketTypeId,
          Row: section.Row.map(row => ({
            id: row.id,
            name: row.name,
            sectionId: row.sectionId,
            createdAt: row.createdAt,
            Seat: row.Seat.map(seat => ({
              id: seat.id,
              name: seat.name,
              rowId: seat.rowId,
              position: seat.position,
              positionX: new Float32Array([seat.positionX]),
              positionY: new Float32Array([seat.positionY]),
              createdAt: seat.createdAt,
              status: seat.Ticket[0].status,
            })),
          })),
        })),
      }
      return Ok(formattedResult);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch seat map data.'));
    }
  }

  async getAllShowings(): Promise<Result<String[], Error>> {
    try {
      const showings = await this.showingRepository.getAllShowing();
      const formattedResult = showings.map(showing => showing.id);
      return Ok(formattedResult);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch showings data.'));
    }
  }
}