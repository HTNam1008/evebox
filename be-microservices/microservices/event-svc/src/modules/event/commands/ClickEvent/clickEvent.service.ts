import { Injectable } from "@nestjs/common";
import { ClickEventRepository } from "../../repositories/clickEvent.repository";
import { Result, Ok, Err } from "oxide.ts";
import e from "express";

@Injectable()
export class ClickEventService {
  constructor(private readonly eventDetailRepository: ClickEventRepository) {}

  async postClicks(eventId: number, userId?: string): Promise<Result<string, Error>> {
    if (!eventId) return Err(new Error("Event ID is required."));

    try {
      const res = await this.eventDetailRepository.postClicks(eventId);
      if (res !== 1) return Err(new Error("EventId not found"));

      if (userId) {
        await this.eventDetailRepository.insertUserClickHistory(eventId, userId);
      }

      return Ok("Success Update");
    } catch (error) {
      console.error(error);
      return Err(new Error("Failed to update event clicks."));
    }
  }
}