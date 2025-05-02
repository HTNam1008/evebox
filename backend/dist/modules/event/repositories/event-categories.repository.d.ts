import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result } from 'oxide.ts';
import { EventCategoryData } from '../domain/entities/categories.entity';
export declare class EventCategoriesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(categoryId: number, eventId: number, isSpecial?: boolean): Promise<Result<EventCategoryData, Error>>;
    updateByEventId(eventId: number, categoryIds: number[]): Promise<Result<EventCategoryData[], Error>>;
    deleteByEventId(eventId: number): Promise<Result<void, Error>>;
}
