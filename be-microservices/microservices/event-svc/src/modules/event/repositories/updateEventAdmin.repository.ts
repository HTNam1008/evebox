import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateEventAdminDto } from '../commands/UpdateEventAdmin/updateEventAdmin.dto';
import { EventDto } from '../commands/UpdateEventAdmin/updateEventAdmin-response.dto';
import { CategoriesResponseDto } from '../queries/getAllCategories/getAllCategories-response.dto';

@Injectable()
export class UpdateEventAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateEvent(
    dto: UpdateEventAdminDto,
    eventId: number,
  ): Promise<Result<EventDto, Error>> {
    try {
      // Build update data dynamically based on provided fields
      const updateData: any = {};
      if (dto.isSpecial) updateData.isSpecial = dto.isSpecial;
      if (dto.isOnlyOnEve) updateData.isOnlyOnEve = dto.isOnlyOnEve;
      updateData.isApproved = false

      const event = await this.prisma.events.update({
        where: { id: eventId >> 0 },
        data: updateData,
      });

      if (event) {
        if (dto.categoryIds && dto.categoryIds.length > 0) {
          await this.updateEventCategory(event.id, dto.categoryIds, dto.isSpecialForCategory);
        }

        const eventDto: EventDto = {
          id: event.id,
          title: event.title,
          description: event.description,
          locationId: event.locationId,
          organizerId: event.organizerId,
          venue: event.venue,
          imgLogoId: event.imgLogoId,
          imgPosterId: event.imgPosterId,
          createdAt: event.createdAt,
          isOnlyOnEve: event.isOnlyOnEve,
          isSpecial: event.isSpecial,
          isSpecialForCategory: dto.isSpecialForCategory,
          lastScore: event.lastScore.toNumber(),
          totalClicks: event.totalClicks,
          weekClicks: event.weekClicks,
          isApproved: event.isApproved,
          orgName: event.orgName,
          orgDescription: event.orgDescription,
          isOnline: event.isOnline,
          categories: await this.getEventCategories(event.id),
        };
        return Ok(eventDto);
      }
      return Err(new Error('Failed to update event'));
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to update event'));
    }
  }

  async updateEventCategory(eventId: number, categoryIds: number[], isSpecialForCategory: boolean): Promise<Result<any, Error>> {
    let parsedCategoryIds: number[];

    if (typeof categoryIds === 'string') {
      try {
        parsedCategoryIds = JSON.parse(categoryIds);
      } catch (error) {
        return Err(new Error('Invalid categoryIds format'));
      }
    } else {
      parsedCategoryIds = categoryIds;
    }

    try {
      // Remove all existing event categories
      await this.prisma.eventCategories.deleteMany({
        where: { eventId: Number(eventId) },
      });
      // If new categories are provided, add them
      if (parsedCategoryIds.length > 0) {
        const categories = await this.prisma.categories.findMany({
          where: {
            id: { in: parsedCategoryIds }
          }
        });
        if (categories.length === 0) {
          return Err(new Error('Categories not found'));
        }
        const eventCategory = categories.map(category => ({
          eventId: Number(eventId),
          categoryId: category.id,
          isSpecial: isSpecialForCategory,
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

  async getEventCategories(eventId: number): Promise<CategoriesResponseDto[]> {
    try {
      const categories = await this.prisma.eventCategories.findMany({
        where: { eventId },
        select: {
          Categories: {
            select: {
              id: true,
              name: true,
              createdAt: true
            }
          }
        } 
      })

      return categories.map(category => category.Categories);
    } catch (error) {
      return([]);
    }
  }
}