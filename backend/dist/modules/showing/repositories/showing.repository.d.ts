import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
export declare class ShowingRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getShowingDetail(showingId: string): Promise<{
        id: string;
        status: string;
        Events: {
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
        };
        eventId: number;
        isFree: boolean;
        isSalable: boolean;
        isPresale: boolean;
        seatMapId: number;
        startTime: Date;
        endTime: Date;
        isEnabledQueueWaiting: boolean;
        showAllSeats: boolean;
        TicketType: {
            id: string;
            description: string;
            status: string;
            name: string;
            imageUrl: string;
            color: string;
            isFree: boolean;
            price: number;
            originalPrice: number;
            maxQtyPerOrder: number;
            minQtyPerOrder: number;
            effectiveFrom: Date;
            effectiveTo: Date;
            position: number;
            isHidden: boolean;
        }[];
    }>;
    getSeatmap(showingId: string): Promise<{
        id: number;
        status: number;
        createdAt: Date;
        name: string;
        viewBox: string;
        Section: {
            id: number;
            createdAt: Date;
            name: string;
            seatmapId: number;
            isStage: boolean;
            element: import("@prisma/client/runtime/library").JsonValue;
            attribute: import("@prisma/client/runtime/library").JsonValue;
            ticketTypeId: string;
            Row: {
                id: number;
                createdAt: Date;
                name: string;
                sectionId: number;
                Seat: {
                    id: number;
                    createdAt: Date;
                    name: string;
                    position: number;
                    rowId: number;
                    positionX: number;
                    positionY: number;
                    Ticket: {
                        status: number;
                    }[];
                }[];
            }[];
        }[];
    }>;
    getAllShowing(): Promise<{
        id: string;
    }[]>;
}
