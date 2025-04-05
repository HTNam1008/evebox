import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { Categories } from '../domain/entities/categories.entity';

@Injectable()
export class GetAllCategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Result<Categories[], Error>> {
    try {
      const categories = await this.prisma.categories.findMany();
      return Ok(categories);
    } catch (error) {
      return Err(new Error('Failed to retrieve categories'));
    }
  }
}