import { CategoriesRepository } from '../../repositories/categories.repository';
import { Result } from 'oxide.ts';
import { Categories } from '../../domain/entities/categories.entity';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    create(name: string): Promise<Result<Categories, Error>>;
    findAll(): Promise<Result<Categories[], Error>>;
    findOne(id: number): Promise<Result<Categories, Error>>;
    remove(id: number): Promise<Result<void, Error>>;
}
