import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
export declare class FrontDisplayWeeklyRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    private readonly eventWeeklyRepository;
    private readonly eventFrontDisplayRepository;
    fetchCategories(): Promise<any>;
    resetEventSpecialData(): Promise<void>;
    updateEventData(res: any): Promise<void>;
    updateLastScore(): Promise<void>;
    updateFrontDisplayWeekly(): Promise<void>;
}
