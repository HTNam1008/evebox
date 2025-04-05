import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateEventDto } from '../commands/updateEvent/updateEvent.dto';
import { EventDto } from '../commands/updateEvent/updateEvent-response.dto';

@Injectable()
export class UpdateEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateEvent(
    dto: UpdateEventDto,
    eventId: number,
    locationId?: number,
    imgLogoId?: number,
    imgPosterId?: number
  ): Promise<Result<EventDto, Error>> {
    try {
      // Build update data dynamically based on provided fields
      const updateData: any = {};
      if (dto.title) updateData.title = dto.title;
      if (dto.description) updateData.description = dto.description;
      if (locationId) updateData.locationId = locationId;
      if (dto.venue) updateData.venue = dto.venue;
      if (imgLogoId) updateData.imgLogoId = imgLogoId;
      if (imgPosterId) updateData.imgPosterId = imgPosterId;
      if (dto.orgName) updateData.orgName = dto.orgName;
      if (dto.orgDescription) updateData.orgDescription = dto.orgDescription;
      if (dto.isOnline) updateData.isOnline = dto.isOnline;
      // Add additional fields as needed, e.g., updating timestamps
      updateData.createdAt = new Date();

      const event = await this.prisma.events.update({
        where: { id: eventId >> 0 },
        data: updateData,
      });

      if (event) {
        const eventDto: EventDto = {
          id: event.id,
          title: event.title,
          description: event.description,
          locationId: event.locationId,
          organizerId: event.organizerId,
          venue: event.venue,
          imgLogoId: event.imgLogoId,
          imgPosterId: event.imgPosterId,
          createAt: event.createdAt,
          isOnlyOnEve: event.isOnlyOnEve,
          isSpecial: event.isSpecial,
          lastScore: event.lastScore.toNumber(),
          totalClicks: event.totalClicks,
          weekClicks: event.weekClicks,
          isApproved: event.isApproved,
          orgName: event.orgName,
          orgDescription: event.orgDescription,
        };
        return Ok(eventDto);
      }
      return Err(new Error('Failed to update event'));
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to update event'));
    }
  }

  async updateEventCategory(eventId: number, categoryIds: number[]): Promise<Result<any, Error>> {
    try {
      // Remove all existing event categories
      await this.prisma.eventCategories.deleteMany({
        where: { eventId }
      });
      // If new categories are provided, add them
      if (categoryIds.length > 0) {
        const categories = await this.prisma.categories.findMany({
          where: {
            id: { in: categoryIds }
          }
        });
        if (categories.length === 0) {
          return Err(new Error('Categories not found'));
        }
        const eventCategory = categories.map(category => ({
          eventId,
          categoryId: category.id
        }));
        await this.prisma.eventCategories.createMany({
          data: eventCategory
        });
        return Ok(eventCategory);
      }
      return Ok([]);
    } catch (error) {
      return Err(new Error('Failed to update event category'));
    }
  }

  async checkAuthor(id: number, userId: string): Promise<Result<boolean, Error>> {
    try {
      const event = await this.prisma.events.findUnique({
        where: { id: id >> 0 },
        select: { organizerId: true },
      });

      if (event && event.organizerId === userId) {
        return Ok(true);
      }
      return Ok(false);
    } catch (error) {
      return Err(new Error('Failed to check author'));
    }
  }
}