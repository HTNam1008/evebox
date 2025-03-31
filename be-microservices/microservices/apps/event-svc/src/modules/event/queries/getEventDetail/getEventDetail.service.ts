import { Injectable } from "@nestjs/common";
import { GetEventDetailRepository } from "../../repositories/getEventDetail.repository";
import { Result, Ok, Err } from "oxide.ts";
import { EventData, EventFrontDisplay } from "../../domain/entities/event.entity";
import e from "express";

@Injectable()
export class GetEventDetailService {
  constructor(private readonly eventDetailRepository: GetEventDetailRepository) {}

  async execute(eventId: number): Promise<Result<EventData, Error>> {
    if (!eventId) {
      return Err(new Error("Event ID is required."));
    }
    try {
      const { eventDetail } = await this.eventDetailRepository.getEventDetail(eventId);
      if (!eventDetail) {
        return Err(new Error("Event not found."));
      }
      

      return Ok(eventDetail);
    } catch (error) {
      console.error(error);
      return Err(new Error("Failed to fetch event detail data."));
    }
    
  }

}