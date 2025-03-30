import { TicketProps } from "./dialog.interface";
export interface CreateQuestionsProps {
    eventId: string;
}

export interface SettingProps {
    eventId: string;
}

export interface TimeAndTypeTicketsProps {
    eventId: string;
}

export interface Showtime {
    id: number;
    startDate: Date | null;
    endDate: Date | null;
    tickets: TicketProps[];
    isExpanded?: boolean;
    showDialog?: boolean;
    showEditDialog?: boolean;
    showCopyTicketDialog?: boolean;
    showConfirmDeleteDialog?: boolean;
    showDeleteShow?: boolean;
}
