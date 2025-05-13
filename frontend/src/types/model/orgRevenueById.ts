// src/types/model/orgRevenueById.ts

export interface TicketTypeRevenueData {
    ticketTypeId: string;
    name: string;
    price: number;
    quantitySold: number;
    revenue: number;
  }
  
  export interface ShowingRevenueData {
    showingId: string;
    startDate: string; // Or `Date` if you parse it
    endDate: string;   // Or `Date` if you parse it
    revenue: number;
    ticketTypes: TicketTypeRevenueData[];
  }
  
  export interface EventRevenueData {
    eventId: number;
    eventName: string;
    totalRevenue: number;
    platformFeePercent: number;
    actualRevenue: number;
    showings: ShowingRevenueData[];
  }
  
  export interface RevenueByIdResponse {
    statusCode: number;
    message: string;
    data: EventRevenueData[];
  }
  