import { Injectable } from "@nestjs/common";
import { GetAllShowingTimeOfEventRepository } from "../../repositories/getAllShowingTimeOfEvent.repository";
import { ShowingTimeResponseDto } from "./getAllShowingTimeOfEvent-response.dto";
import { Err, Result } from "oxide.ts";


@Injectable()
export class GetAllShowingTimeOfEventService {
  constructor(private readonly getAllShowingTimeOfEventRepository: GetAllShowingTimeOfEventRepository) {}

  async findAll(eventId: number): Promise<Result<ShowingTimeResponseDto[], Error>> {
    try {
      if (!eventId) {
        return Err(new Error('Event ID is required'));
      }
      return await this.getAllShowingTimeOfEventRepository.getAllShowingTimeOfEvent(eventId);;
    } catch (error) {
      return Err(new Error('Failed to retrieve showings'));
    }
  }
}
