import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
export declare class EventFrontDisplayRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSpecialEvents(): Promise<{
        id: number;
        title: string;
        startDate: Date;
        status: string;
        minTicketPrice: number;
        lastScore: import("@prisma/client/runtime/library").Decimal;
        totalClicks: number;
        weekClicks: number;
        Images_Events_imgLogoIdToImages: {
            id: number;
            imageUrl: string;
        };
        Images_Events_imgPosterIdToImages: {
            id: number;
            imageUrl: string;
        };
    }[]>;
    getOnlyOnEveEvents(): Promise<{
        id: number;
        title: string;
        startDate: Date;
        status: string;
        minTicketPrice: number;
        lastScore: import("@prisma/client/runtime/library").Decimal;
        totalClicks: number;
        weekClicks: number;
        Images_Events_imgLogoIdToImages: {
            id: number;
            imageUrl: string;
        };
        Images_Events_imgPosterIdToImages: {
            id: number;
            imageUrl: string;
        };
    }[]>;
    getSpecialEventsByCategory(): Promise<any[]>;
    getTrendingEvents(): Promise<{
        calculatedScore: number;
        maxScore: number;
        id: number;
        title: string;
        startDate: Date;
        status: string;
        minTicketPrice: number;
        lastScore: import("@prisma/client/runtime/library").Decimal;
        totalClicks: number;
        weekClicks: number;
        Images_Events_imgLogoIdToImages: {
            id: number;
            imageUrl: string;
        };
        Images_Events_imgPosterIdToImages: {
            id: number;
            imageUrl: string;
        };
    }[]>;
    getRecommendedEvents(gte: Date, lte: Date): Promise<{
        id: number;
        title: string;
        startDate: Date;
        status: string;
        minTicketPrice: number;
        lastScore: import("@prisma/client/runtime/library").Decimal;
        totalClicks: number;
        weekClicks: number;
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
