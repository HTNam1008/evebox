import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
export declare class EventDetailRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getEventDetail(eventId: number): Promise<{
        eventDetail: {
            locations: {
                districts: {
                    province: {
                        name: string;
                    };
                    name: string;
                };
                id: number;
                createdAt: Date;
                street: string;
                ward: string;
                districtId: number;
            };
            id: number;
            title: string;
            description: string;
            startDate: Date;
            endDate: Date;
            organizerId: string;
            status: string;
            locationId: number;
            venue: string;
            createdAt: Date;
            minTicketPrice: number;
            isOnlyOnEve: boolean;
            isSpecial: boolean;
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
            Showing: {
                id: string;
                status: string;
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
            }[];
        };
        locationsString: string;
    }>;
    getRecommendedEventsInDetail(eventId: number, limit: string): Promise<{
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
    postClicks(eventId: number): Promise<0 | 1 | 2>;
}
