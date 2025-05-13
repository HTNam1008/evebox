// src/types/model/ticketPriceRevenue.ts

export interface RevenueByTicketPriceData {
    price: number;
    total: number;
    sold: number;
    conversionRate: number;
    revenue: number;
  }
  
  export interface RevenueByTicketPriceResponse {
    statusCode: number;
    message: string;
    data: RevenueByTicketPriceData[];
  }
  