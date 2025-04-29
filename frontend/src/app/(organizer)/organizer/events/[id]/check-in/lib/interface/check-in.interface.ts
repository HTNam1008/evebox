export interface Ticket {
    id: string;
    type: string;
}

export interface Showing {
  startTime: string;
  endTime: string;
}

export interface TicketCheckin {
    orderId: string;
    ticket: Ticket;
    showing: Showing;
    venue?: string | null;
};

//Search 
export interface SearchBarProps {
    onSearch: (keyword: string) => void;
}


export interface TicketCheckinTableProps {
    searchKeyword: string;
}