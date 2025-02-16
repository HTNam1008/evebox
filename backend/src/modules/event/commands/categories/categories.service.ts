import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../repositories/categories.repository';
import { Result } from 'oxide.ts';
import { Categories } from '../../domain/entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(name: string): Promise<Result<Categories, Error>> {
    return this.categoriesRepository.create(name);
  }

  async findAll(): Promise<Result<Categories[], Error>> {
    return this.categoriesRepository.findAll();
  }

  async findOne(id: number): Promise<Result<Categories, Error>> {
    return this.categoriesRepository.findOne(id);
  }

  async remove(id: number): Promise<Result<void, Error>> {
    return this.categoriesRepository.remove(id);
  }
}
