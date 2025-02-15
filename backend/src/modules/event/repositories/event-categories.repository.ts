import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { EventCategoryData } from '../domain/entities/categories.entity';

@Injectable()
export class EventCategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(categoryId: number, eventId: number, isSpecial?: boolean): Promise<Result<EventCategoryData, Error>> {
    try {
      // const category = await this.prisma.categories.create({ data: { name } });
      // return Ok(category);
      const eventCategory = await this.prisma.eventCategories.create({
        data: {
          categoryId: categoryId,
          eventId: eventId,
          isSpecial: isSpecial || false,
        },
      });
      return Ok(eventCategory);
    } catch (error) {
      return Err(new Error('Failed to create category'));
    }
  }

  async updateByEventId(eventId: number, categoryIds: number[]): Promise<Result<EventCategoryData[], Error>> {
    try {
      const eventCategories = await this.prisma.eventCategories.findMany({ where: { eventId } });
      const currentCategoryIds = eventCategories.map(eventCategory => eventCategory.categoryId);
      const categoriesToAdd = categoryIds.filter(categoryId => !currentCategoryIds.includes(categoryId));
      const categoriesToRemove = currentCategoryIds.filter(categoryId => !categoryIds.includes(categoryId));

      await Promise.all(categoriesToAdd.map(categoryId => this.create(categoryId, eventId)));
      await Promise.all(categoriesToRemove.map(categoryId => this.prisma.eventCategories.deleteMany({ where: { categoryId: categoryId, eventId } })));
    } catch (error) {
      return Err(new Error('Failed to update categories'));
    }
  }

  async deleteByEventId(eventId: number): Promise<Result<void, Error>> {
    try {
      await this.prisma.eventCategories.deleteMany({ where: { eventId } });
      return Ok(undefined);
    } catch (error) {
      return Err(new Error('Failed to delete categories'));
    }
  }
}
