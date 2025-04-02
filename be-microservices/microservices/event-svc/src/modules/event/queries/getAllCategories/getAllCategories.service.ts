import { Injectable } from '@nestjs/common';
import { GetAllCategoriesRepository } from '../../repositories/getAllCategories.repository';
import { Result } from 'oxide.ts';
import { Categories } from '../../domain/entities/categories.entity';

@Injectable()
export class GetAllCategoriesService {
  constructor(private readonly categoriesRepository: GetAllCategoriesRepository) {}

  async findAll(): Promise<Result<Categories[], Error>> {
    return this.categoriesRepository.findAll();
  }
}
