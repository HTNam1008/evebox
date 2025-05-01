import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
export declare class EventSearchRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getEventsByTitle(title: string): Promise<{
        id: number;
        title: string;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        minTicketPrice: number;
        lastScore: import("@prisma/client/runtime/library").Decimal;
        EventCategories: {
            Categories: {
                id: number;
                name: string;
            };
        }[];
        Images_Events_imgLogoIdToImages: {
            id: number;
            imageUrl: string;
        };
        Images_Events_imgPosterIdToImages: {
            id: number;
            imageUrl: string;
        };
    }[]>;
}
