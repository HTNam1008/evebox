import { Injectable } from "@nestjs/common";
import { EventDetailRepository } from "../../repositories/event-detail.repository";
import { Result, Ok, Err } from "oxide.ts";
import { EventData, EventFrontDisplay } from "../../domain/entities/event.entity";
import { prisma } from "src/prisma";

@Injectable()
export class EventDetailService {
  constructor(private readonly eventDetailRepository: EventDetailRepository) {}

  async execute(eventId: number): Promise<Result<EventData, Error>> {
    try {
      const eventDetail = await this.eventDetailRepository.getEventDetail(eventId);

      const formattedResult: EventData = {
        id: eventDetail.id,
        title: eventDetail.title,
        description: eventDetail.description,
        startDate: eventDetail.startDate,
        endDate: eventDetail.endDate,
        organizerId: eventDetail.organizerId,
        status: eventDetail.status,
        locationId: eventDetail.locationId,
        totalTickets: eventDetail.totalTickets,
        availableTickets: eventDetail.availableTickets,
        Images_Events_imgLogoIdToImages: eventDetail.Images_Events_imgLogoIdToImages,
        Images_Events_imgPosterIdToImages: eventDetail.Images_Events_imgPosterIdToImages,
        createdAt: eventDetail.createdAt,
        locations: eventDetail.locations,
        lastScore: eventDetail.lastScore,
        isSpecial: eventDetail.isSpecial,
        isOnlyOnEve: eventDetail.isOnlyOnEve,
        categories: eventDetail.EventCategories.map(category => ({
          id: category.Categories.id,
          name: category.Categories.name,
        })),
      }

      return Ok(formattedResult);
    } catch (error) {
      console.error(error);
      return Err(new Error("Failed to fetch event detail data."));
    }
  }

  async getRecommendedEventsInDetail(eventId: number, locations: number[], numberOfEvents = 20): Promise<Result<EventFrontDisplay[], Error>> {
    try {
      const recommendedEvents = await this.eventDetailRepository.getRecommendedEventsInDetail(eventId, locations, numberOfEvents);

      return Ok(recommendedEvents);
    } catch (error) {
      console.error(error);
      return Err(new Error("Failed to fetch recommended events."));
    }
  }
}