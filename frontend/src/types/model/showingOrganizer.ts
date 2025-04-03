import { BaseApiResponse } from "../BaseApiResponse";

export interface TicketType {
    id: string;
    name: string;
    description: string;
    color: string;
    isFree: boolean;
    originalPrice: number;
    maxQtyPerOrder: number;
    minQtyPerOrder: number;
    startTime: string;
    endTime: string;
    imageUrl?: string;
    isHidden: boolean;
    quantity: number;
    position: number;
}
  
export interface Showing {
    id: string;
    startTime: string;
    endTime: string;
    TicketType: TicketType[];
}

// Response cho API /user/me
export type ShowingOrgResponse = BaseApiResponse<Showing[]>;