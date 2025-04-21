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
    imgUrl: string;
}