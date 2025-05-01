import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result } from 'oxide.ts';
import { Categories } from '../domain/entities/categories.entity';
export declare class CategoriesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(name: string): Promise<Result<Categories, Error>>;
    findAll(): Promise<Result<Categories[], Error>>;
    findOne(id: number): Promise<Result<Categories, Error>>;
    remove(id: number): Promise<Result<void, Error>>;
}
