import { BaseApiResponse } from "../BaseApiResponse";

export interface TicketType {
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
    imageUrl?: string;
    isHidden: boolean;
}
  
export interface Showing {
    id: string;
    startTime: string;
    endTime: string;
    TicketType: TicketType[];
}

// Response cho API /user/me
export type ShowingOrgResponse = BaseApiResponse<Showing[]>;