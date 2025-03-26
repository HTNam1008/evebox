import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { Categories } from '../domain/entities/categories.entity';
import { CreateEventDto } from '../commands/createEvent/createEvent.dto';
import e from 'express';
import { EventDto } from '../commands/createEvent/createEvent-response.dto';

@Injectable()
export class CreateEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(dto: CreateEventDto, orgId: string, imgLogoId: number, imgPosterId: number, locationId?: number): Promise<Result<EventDto, Error>> {
    try{
      const event = await this.prisma.events.create({
        data: {
          title: dto.title,
          description: dto.description,
          locationId: locationId >> 0 || null,
          organizerId: orgId,
          venue: dto.venue,
          imgLogoId: imgLogoId >> 0,
          imgPosterId: imgPosterId >> 0,
          createdAt: new Date(),
          orgDescription: dto.orgDescription,
          orgName: dto.orgName,
          isOnlyOnEve: false,
          isSpecial: false,
          lastScore: 0,
          totalClicks: 0,
          weekClicks: 0,
        }
      });
      if (event) {
        const eventDto: EventDto = {
          id: event.id,
          title: event.title,
          description: event.description,
          locationId: event.locationId,
          isOnline: event.isOnline,
          organizerId: event.organizerId,
          venue: event.venue,
          imgLogoId: event.imgLogoId,
          imgPosterId: event.imgPosterId,
          createAt: event.createdAt,
          orgDescription: event.orgDescription,
          orgName: event.orgName,
          isOnlyOnEve: event.isOnlyOnEve,
          isSpecial: event.isSpecial,
          lastScore: event.lastScore.toNumber(),
          totalClicks: event.totalClicks,
          weekClicks: event.weekClicks,
          isApproved: event.isApproved,
        };
        return Ok(eventDto);
      }
      return Err(new Error('Failed to create event'));
    } catch (error) {
      return Err(new Error('Failed to create event'));
    }
  }

  async createEventCategory(eventId: number, categoryIds: number[]): Promise<Result<any, Error>> {
    try{
      const categories = await this.prisma.categories.findMany({
        where: {
          id: {
            in: categoryIds
          }
        }
      })
      if (categories.length === 0) {
        return Err(new Error('Categories not found'));
      }
      const eventCategory = categories.map(category => {
        return {
          eventId: eventId,
          categoryId: category.id >> 0
        }
      })
      await this.prisma.eventCategories.createMany({
        data: eventCategory
      });
      return Ok(eventCategory);
    }
    catch (error) {
      return Err(new Error('Failed to create event category'));
    }
  }
}