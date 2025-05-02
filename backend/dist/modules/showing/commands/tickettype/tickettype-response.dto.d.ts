export declare class TicketTypeDto {
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
export declare class TicketTypeResponseDto {
    statusCode: number;
    message: string;
    data: TicketTypeDto[];
}
