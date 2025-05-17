// src/types/model/eventRevenueDetail.ts

export interface ShowingRevenueData {
    showingId: string;
    startTime: string; // ISO string, parse to Date if needed
    endTime: string;
    revenue: number;
  }
  
  export interface EventRevenueDetailResponse {
    statusCode: number;
    message: string;
    data: ShowingRevenueData[];
  }
  