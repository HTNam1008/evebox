import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { Categories } from '../domain/entities/categories.entity';
import { CreateEventDto } from '../commands/CreateEvent/createEvent.dto';
import e from 'express';

@Injectable()
export class CreateEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(dto: CreateEventDto, locationId: number, orgId: string, imgLogoId: number, imgPosterId: number): Promise<Result<any, Error>> {
    try{
      const event = await this.prisma.events.create({
        data: {
          title: dto.title,
          description: dto.description,
          locationId: locationId >> 0,
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
        return Ok(event);
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