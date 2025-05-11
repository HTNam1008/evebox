import { Injectable } from "@nestjs/common";
import { Err, Result } from "oxide.ts";
import { GetEventsRepository } from "../../repositories/getEvents.repository";
import { EventDataDto } from "./getEvents-response.dto";

@Injectable()
export class GetEventsService {
  constructor(private readonly getEventsRepository: GetEventsRepository) {}

  async execute(filters: any, email: string): Promise<Result<EventDataDto[], Error>> {
    try {
      return await this.getEventsRepository.findWithFilters(filters, email);
    } catch (error) {
      return Err(new Error('Failed to retrieve events'));
    }
  }

  async count (filters: any): Promise<number> {
    try {
      return await this.getEventsRepository.count(filters);
    } catch (error) {
      throw new Error('Failed to count total events');
    }
  }
}