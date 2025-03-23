export interface NoteDialogProps {
    open: boolean;
    onClose: () => void;
}

export interface TicketProps {
    name:string;
    price: string;
    total: string;
    min: string;
    max: string;
    startDate: Date | null;  
    endDate: Date | null;    
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
    information: string;
    image?: string | null;
    free: boolean;
}

export interface CreateTypeTicketDailogProps {
    open: boolean;
    onClose: () => void;
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
    addTicket: (ticket: TicketProps) => void;
}

export interface EditTypeTicketDailogProps {
    open: boolean;
    onClose: () => void;
    endDateEvent: Date | null;
    updateTicket: (ticket: TicketProps) => void; 
    ticket: TicketProps;
}