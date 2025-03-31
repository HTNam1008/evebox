import { Showtime } from "./idevent.interface";
export interface NoteDialogProps {
    open: boolean;
    onClose: () => void;
}

export interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface CopyTicketDailogProps {
    open: boolean; 
    onClose: () => void; 
    showtimes: Showtime[]; 
    currentShowtimeId: string; 
    setShowtimes: (updatedShowtimes: Showtime[]) => void;
}

export interface TicketProps {
    id: string;
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
    image?: string | File | null;
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