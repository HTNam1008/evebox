import { CreateTicketTypeDto } from './create-tickettype.dto';
declare const UpdateTicketTypeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTicketTypeDto>>;
export declare class UpdateTicketTypeDto extends UpdateTicketTypeDto_base {
    showingId?: string;
    name?: string;
    description?: string;
    color?: string;
    isFree?: boolean;
    price?: number;
    originalPrice?: number;
    maxQtyPerOrder?: number;
    minQtyPerOrder?: number;
    effectiveFrom?: Date;
    effectiveTo?: Date;
    position?: number;
    status?: string;
    imageUrl?: string;
    isHidden?: boolean;
}
export {};
