import { eventService } from "./instance.service";
import { END_POINT_LIST } from "./endpoints";
import { OrganizerRevenueResponse } from "@/types/model/organizerRevenue";
import { RevenueByIdResponse } from "@/types/model/orgRevenueById";
import { EventRevenueDetailResponse } from "@/types/model/eventRevenueDetail";
import { SummaryTicketRevenueResponse } from "@/types/model/summaryTicketRevenue";
import { ProvinceRevenueResponse } from "@/types/model/provinceRevenue";
import { RevenueByTicketPriceResponse } from "@/types/model/ticketPriceRevenue";

export const getOrganizerRevenue = async (
  fromDate?: string,
  toDate?: string,
  search?: string
): Promise<OrganizerRevenueResponse> => {
  const params = new URLSearchParams();
  if (fromDate) params.append("fromDate", fromDate);
  if (toDate) params.append("toDate", toDate);
  if (search) params.append("search", search);

  const res = await eventService.get(`${END_POINT_LIST.ADMIN_STATISTICS.GET_REVENUE}?${params.toString()}`);

  if (!res || !res.data) throw new Error("Failed to fetch organizer revenue");

  return res.data;
};

export const getRevenueByOrgId = async (orgId: string): Promise<RevenueByIdResponse> => {
    const res = await eventService.get(`${END_POINT_LIST.ADMIN_STATISTICS.GET_REVENUE}/${orgId}`);
  
    if (!res || !res.data) {
      throw new Error("Failed to fetch revenue by orgId");
    }
  
    return res.data;
  };

  export const getEventRevenueDetail = async (
    orgId: string,
    eventId: number
  ): Promise<EventRevenueDetailResponse> => {
    const res = await eventService.get(
      `${END_POINT_LIST.ADMIN_STATISTICS.GET_REVENUE}/${orgId}/${eventId}`
    );
  
    if (!res || !res.data) {
      throw new Error("Failed to fetch event revenue detail");
    }
  
    return res.data;
  };

  export const getSummaryTicketRevenue = async (
    orgId: string,
    eventId: number,
    showingId: string
  ): Promise<SummaryTicketRevenueResponse> => {
    const res = await eventService.get(
      `${END_POINT_LIST.ADMIN_STATISTICS.GET_REVENUE}/${orgId}/${eventId}/${showingId}`
    );
  
    if (!res || !res.data) {
      throw new Error("Failed to fetch summary ticket revenue");
    }
  
    return res.data;
  };

  export const getProvinceRevenue = async (): Promise<ProvinceRevenueResponse> => {
    const res = await eventService.get(END_POINT_LIST.ADMIN_STATISTICS.GET_REVENUE_BY_PROVINCE);
  
    if (!res || !res.data) {
      throw new Error("Failed to fetch province revenue data");
    }
  
    return res.data;
  };

  export const getRevenueByTicketPrice = async (): Promise<RevenueByTicketPriceResponse> => {
    const res = await eventService.get(END_POINT_LIST.ADMIN_STATISTICS.GET_REVENUE_BY_TICKETPRICE);
  
    if (!res || !res.data) {
      throw new Error("Failed to fetch revenue by ticket price");
    }
  
    return res.data;
  };