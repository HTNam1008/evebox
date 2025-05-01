import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
export declare class EventWeeklyRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    fetchEventDetails(eventId: number): Promise<any>;
    handleEventLocation(address: string): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
    addToEventCategory(categories: string[], eventId: number): Promise<void>;
    createOrUpdateEventDetail(eventId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        organizerId: string | null;
        status: string;
        locationId: number;
        venue: string | null;
        imgLogoId: number | null;
        imgPosterId: number | null;
        createdAt: Date;
        minTicketPrice: number;
        isOnlyOnEve: boolean;
        isSpecial: boolean;
        lastScore: import("@prisma/client/runtime/library").Decimal;
        totalClicks: number;
        weekClicks: number;
    }>;
    fetchEventsFromTicketBox(page: number, categories: string): Promise<void>;
    updateAllEvents(): Promise<void>;
}
