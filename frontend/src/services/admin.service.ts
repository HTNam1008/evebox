import { eventService } from "./instance.service";
import { END_POINT_LIST } from "./endpoints";
import { OrganizerRevenueResponse } from "@/types/model/organizerRevenue";
import { RevenueByIdResponse } from "@/types/model/orgRevenueById";
import { EventRevenueDetailResponse } from "@/types/model/eventRevenueDetail";
import { SummaryTicketRevenueResponse } from "@/types/model/summaryTicketRevenue";
import { ProvinceRevenueResponse } from "@/types/model/provinceRevenue";
import { RevenueByTicketPriceResponse } from "@/types/model/ticketPriceRevenue";
import { RevenueSummaryResponse } from "@/types/model/RevenueSummaryResponse";
import { GetAllLocationsResponseDto } from "@/types/model/getAllLocationsResponse";

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

  export const getOrgRevenueChart = async (
    fromDate?: string,
    toDate?: string,
    filterType: "month" | "year" = "month"
  ): Promise<RevenueSummaryResponse> => {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    params.append("filterType", filterType);
  
    try {
      const res = await eventService.get(
        `${END_POINT_LIST.ADMIN_STATISTICS.GET_REVENUE_CHART}?${params.toString()}`
      );
  
      const rawData = res?.data?.data;
      if (!Array.isArray(rawData)) {
        throw new Error("Invalid chart data structure");
      }
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const labels = rawData.map((item: any) => item.period);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values = rawData.map((item: any) => item.actualRevenue); // or item.totalRevenue
  
      return { labels, values };
    } catch (error) {
      console.error("Failed to fetch organizer revenue chart data", error);
      throw error;
    }
  };

  export const getAllLocations = async (
  organizerId?: string,
  provinceId?: number
): Promise<GetAllLocationsResponseDto> => {
  const params = new URLSearchParams();
  if (organizerId) params.append("organizerId", organizerId);
  if (provinceId !== undefined) params.append("provinceId", provinceId.toString());

  try {
    const res = await eventService.get(
      `${END_POINT_LIST.LOCATION.GET_ALL_LOCATIONS}?${params.toString()}`
    );

    if (!res || !res.data) {
      throw new Error("Failed to fetch locations");
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};