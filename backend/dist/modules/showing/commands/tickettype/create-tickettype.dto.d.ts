export declare class CreateTicketTypeDto {
    showingId: string;
    name: string;
    description: string;
    color: string;
    isFree: boolean;
    price: number;
    originalPrice: number;
    maxQtyPerOrder: number;
    minQtyPerOrder: number;
    effectiveFrom: Date;
    effectiveTo?: Date;
    position: number;
    status: string;
    imageUrl: string;
    isHidden?: boolean;
}
