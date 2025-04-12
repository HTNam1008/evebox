// getSummaryOrg.ts

export interface TicketTypeSummary {
    typeName: string;
    price: number;
    sold: number;
    ratio: number;
  }
  
  export interface EventSummaryData {
    eventId: number;
    eventTitle: string;
    totalRevenue: number;
    ticketsSold: number;
    totalTickets: number;
    percentageSold: number;
    byTicketType: TicketTypeSummary[];
  }
  
  export interface EventSummaryResponse {
    statusCode: number;
    message: string;
    data: EventSummaryData;
  }
  