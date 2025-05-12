import { Event } from "./showingTable.interface";

export interface TicketTypeProps {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    description: string;
    price: number;
    quantity:number;
    sold: number;
    status: string;
}

export interface TicketTypeDetailProps {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    description: string;
    price: number;
    maxQtyPerOrder: number;
    minQtyPerOrder: number;
    quantity:number;
    sold: number;
    status: string;
    imageUrl: string;
}

export interface TicketOfShowing {
    id: string;
    event: Event;
    startTime: string;
    endTime: string;
    seatMapId: number;
    ticketType: TicketTypeDetailProps;
}