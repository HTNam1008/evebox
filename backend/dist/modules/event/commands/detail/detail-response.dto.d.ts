declare class ImageDto {
    id: number;
    imageUrl: string;
}
declare class TicketTypeDto {
    id: string;
    name: string;
    description: string;
    color: string;
    isFree: boolean;
    price: number;
    originalPrice: number;
    maxQtyPerOrder: number;
    minQtyPerOrder: number;
    effectiveFrom: string;
    effectiveTo: string;
    position: number;
    status: string;
    imageUrl: string;
    isHidden: boolean;
}
declare class ShowingDto {
    id: string;
    eventId: number;
    status: string;
    isFree: boolean;
    isSalable: boolean;
    isPresale: boolean;
    seatMapId: number;
    startTime: string;
    endTime: string;
    isEnabledQueueWaiting: boolean;
    showAllSeats: boolean;
    TicketType: TicketTypeDto[];
}
declare class CategoryDto {
    id: number;
    name: string;
}
export declare class EventDetailResponseDto {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    organizerId: number | null;
    status: string;
    locationId: number;
    venue: string;
    Images_Events_imgLogoIdToImages: ImageDto;
    Images_Events_imgPosterIdToImages: ImageDto;
    createdAt: string;
    locationsString: string;
    lastScore: string;
    isSpecial: boolean;
    isOnlyOnEve: boolean;
    categories: CategoryDto[];
    showing: ShowingDto[];
}
export declare class EventDetailResponse {
    statusCode: number;
    message: string;
    data: EventDetailResponseDto;
}
export {};
