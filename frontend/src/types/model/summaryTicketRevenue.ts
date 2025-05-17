// src/types/model/summaryTicketRevenue.ts

export interface TicketTypeSummary {
    typeName: string;
    price: number;
    sold: number;
    ratio: number;
  }
  
  export interface SummaryTicketRevenueData {
    eventId: number;
    eventTitle: string;
    showingId: string;
    startTime: string;
    endTime: string;
    totalRevenue: number;
    ticketsSold: number;
    totalTickets: number;
    percentageSold: number;
    byTicketType: TicketTypeSummary[];
  }
  
  export interface SummaryTicketRevenueResponse {
    statusCode: number;
    message: string;
    data: SummaryTicketRevenueData;
  }
  