import { EventDto } from 'src/modules/event/commands/event/event-response.dto';
import { TicketTypeDto } from '../tickettype/tickettype-response.dto';
declare class ShowingDataDto {
    id: string;
    eventId: number;
    status: string;
    isFree: boolean;
    isSalable: boolean;
    isPresale: boolean;
    seatMapId: number;
    startTime: string;
    endTime: string;
    isEnabledQueueWaiting: boolean;
    showAllSeats: boolean;
    Events: EventDto;
    TicketType: TicketTypeDto[];
}
export declare class ShowingResponseDto {
    statusCode: number;
    message: string;
    data: ShowingDataDto;
}
export declare class AllShowingsResponseDto {
    statusCode: number;
    message: string;
    data: {
        showingIds: string[];
    };
}
import { JsonValue } from 'type-fest';
declare class SeatDto {
    id: number;
    name: string;
    rowId: number;
    position: number;
    positionX: JsonValue;
    positionY: JsonValue;
    createdAt: string;
    status: number;
}
declare class RowDto {
    id: number;
    name: string;
    sectionId: number;
    createdAt: string;
    Seat: SeatDto[];
}
declare class SectionDto {
    id: number;
    name: string;
    seatmapId: number;
    createdAt: string;
    isStage: boolean;
    element?: JsonValue;
    attribute: JsonValue;
    ticketTypeId?: string;
    Row?: RowDto[];
}
declare class SeatMapDto {
    id: number;
    name: string;
    createdAt: string;
    viewBox: string;
    status: number;
    Section: SectionDto[];
}
export declare class SeatMapResponseDto {
    statusCode: number;
    message: string;
    data: SeatMapDto;
}
export {};
