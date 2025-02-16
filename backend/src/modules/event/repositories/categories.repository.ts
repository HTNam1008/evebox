import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { Categories } from '../domain/entities/categories.entity';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string): Promise<Result<Categories, Error>> {
    try {
      const category = await this.prisma.categories.create({ data: { name: name, createdAt: new Date(Date.now()) } });
      return Ok(category);
    } catch (error) {
      return Err(new Error('Failed to create category'));
    }
  }

  async findAll(): Promise<Result<Categories[], Error>> {
    try {
      const categories = await this.prisma.categories.findMany();
      return Ok(categories);
    } catch (error) {
      return Err(new Error('Failed to retrieve categories'));
    }
  }

  async findOne(id: number): Promise<Result<Categories, Error>> {
    try {
      const category = await this.prisma.categories.findUnique({ where: { id } });
      if (!category) return Err(new Error('Category not found'));
      return Ok(category);
    } catch (error) {
      return Err(new Error('Failed to retrieve category'));
    }
  }

  async remove(id: number): Promise<Result<void, Error>> {
    try {
      await this.prisma.categories.delete({ where: { id: id >> 0 } });
      return Ok(undefined);
    } catch (error) {
      console.log(error);
      return Err(new Error('Failed to delete category'));
    }
  }
}