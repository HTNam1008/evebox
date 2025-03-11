import { Injectable } from "@nestjs/common";
import { EventDetailRepository } from "../../repositories/event-detail.repository";
import { Result, Ok, Err } from "oxide.ts";
import { EventData, EventFrontDisplay } from "../../domain/entities/event.entity";
import e from "express";

@Injectable()
export class EventDetailService {
  constructor(private readonly eventDetailRepository: EventDetailRepository) {}

  async execute(eventId: number): Promise<Result<EventData, Error>> {
    if (!eventId) {
      return Err(new Error("Event ID is required."));
    }
    try {
      const { eventDetail, locationsString } = await this.eventDetailRepository.getEventDetail(eventId);
      if (!eventDetail) {
        return Err(new Error("Event not found."));
      }
      const formattedResult: EventData = {
        id: eventDetail.id,
        title: eventDetail.title,
        description: eventDetail.description,
        startDate: eventDetail.startDate,
        endDate: eventDetail.endDate,
        organizerId: eventDetail.organizerId,
        status: eventDetail.status,
        locationId: eventDetail.locationId,
        minTicketPrice: eventDetail.minTicketPrice,
        venue: eventDetail.venue,
        Images_Events_imgLogoIdToImages: eventDetail.Images_Events_imgLogoIdToImages,
        Images_Events_imgPosterIdToImages: eventDetail.Images_Events_imgPosterIdToImages,
        createdAt: eventDetail.createdAt,
        locationsString: locationsString,
        lastScore: eventDetail.lastScore,
        isSpecial: eventDetail.isSpecial,
        isOnlyOnEve: eventDetail.isOnlyOnEve,
        categories: eventDetail.EventCategories.map(category => ({
          id: category.Categories.id,
          name: category.Categories.name,
        })),
        showing: eventDetail.Showing,
      }

      return Ok(formattedResult);
    } catch (error) {
      console.error(error);
      return Err(new Error("Failed to fetch event detail data."));
    }
    
  }

  async getRecommendedEventsInDetail(eventId: number, limit: string): Promise<Result<EventFrontDisplay[], Error>> {
    if (!eventId) {
      return Err(new Error("Event ID is required."));
    }
    try {
      if (!limit) {
        limit = "20";
      }
      const recommendedEvents = await this.eventDetailRepository.getRecommendedEventsInDetail(eventId, limit);

      return Ok(recommendedEvents);
    } catch (error) {
      console.error(error);
      return Err(new Error("Event not found."));
    }
  }

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