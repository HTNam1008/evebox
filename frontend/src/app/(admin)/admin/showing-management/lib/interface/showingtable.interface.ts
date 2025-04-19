export interface Event {
  id: number;
  title: string;
}

export interface TicketType {
  id: number;
}

export interface Showing {
  id: string;
  eventTitle: Event;
  startTime: string;
  endTime: string;
  seatMapId: number;
  numTicketType: TicketType[];
}
