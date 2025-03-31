import { Injectable } from "@nestjs/common";
import { ClickEventRepository } from "../../repositories/clickEvent.repository";
import { Result, Ok, Err } from "oxide.ts";
import e from "express";

@Injectable()
export class ClickEventService {
  constructor(private readonly eventDetailRepository: ClickEventRepository) {}

  async postClicks(eventId: number): Promise<Result<String, Error>> {
    if (!eventId) {
      return Err(new Error("Event ID is required."));
    }
    try {
      const res = await this.eventDetailRepository.postClicks(eventId);
      if (res === 1) {
        return Ok("Success Update");
      }
      return Err(new Error("EventId not found"));
    } catch (error) {
      console.error(error);
      return Err(new Error("Failed to update event clicks."));
    }
  }
}