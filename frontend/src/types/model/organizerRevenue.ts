// src/types/model/organizerRevenue.ts

import { BaseApiResponse } from "../BaseApiResponse";

export interface TicketTypeRevenueData {
    ticketTypeId: string;
    name: string;
    price: number;
    sold: number;
    revenue: number;
  }
  
  export interface ShowingRevenueData {
    showingId: string;
    startDate: string; // Or Date if you're parsing it
    endDate: string;   // Or Date if you're parsing it
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
  
  export interface OrganizerRevenueData {
    orgId: string;
    organizerName: string;
    totalRevenue: number;
    platformFeePercent: number;
    actualRevenue: number;
    events: EventRevenueData[];
  }

  export type OrganizerRevenueResponse = BaseApiResponse<OrganizerRevenueData>;
  