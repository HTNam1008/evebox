import { TicketType } from "./tickettype.entity";
import { EventFrontDisplay } from "src/modules/event/domain/entities/event.entity";
export interface ShowingFront {
    id: String;
    eventId: number;
    status: String;
    isFree: Boolean;
    isSalable: Boolean;
    isPresale: Boolean;
    seatMapId: number;
    startTime: Date;
    endTime: Date;
    isEnabledQueueWaiting: Boolean;
    showAllSeats: Boolean;
    TicketType: TicketType[];
}
export interface ShowingData {
    id: String;
    eventId: number;
    status: String;
    isFree: Boolean;
    isSalable: Boolean;
    isPresale: Boolean;
    seatMapId: number;
    startTime: Date;
    endTime: Date;
    isEnabledQueueWaiting: Boolean;
    showAllSeats: Boolean;
    TicketType: TicketType[];
    Events: EventFrontDisplay;
}
