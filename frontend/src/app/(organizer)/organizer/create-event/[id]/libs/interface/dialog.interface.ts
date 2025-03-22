export interface NoteDialogProps {
    open: boolean;
    onClose: () => void;
}

export interface CreateTypeTicketDailogProps {
    open: boolean;
    onClose: () => void;
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
    addTicket: (ticket: {name:string}) => void;
}