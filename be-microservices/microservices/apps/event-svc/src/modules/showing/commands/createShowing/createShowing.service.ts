import { Injectable } from "@nestjs/common";
import { CreateShowingRepository } from "../../repositories/createShowing.repository";
import { Err, Result } from "oxide.ts";

@Injectable()
export class CreateShowingService {
  constructor(private readonly createShowingRepository: CreateShowingRepository) {}

  async createShowing(dto: any, eventId: number): Promise<Result<string, Error>> {
    try{
      if (!eventId || isNaN(eventId)) {
        return Err(new Error('Event not found'));
      }

      if(!dto.startTime || !dto.endTime || dto.startTime >= dto.endTime) {
        return Err(new Error('Invalid start time or end time'));
      }
      const result = await this.createShowingRepository.createShowing(dto, eventId);

      if (result.isOk()) {
        return result;
      }
      return Err(result.unwrapErr());
    }
    catch (error) {
      return Err(new Error('Failed to create showing'));
    }
  }
}