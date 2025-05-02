import { orgService } from "./instance.service";
import { END_POINT_LIST } from "./endpoints";
import { IShowTime, IEventSummaryData } from "@/types/model/getSummaryOrg";
import { GetOrdersResponse } from "@/types/model/getOrdersOrg";
import { AnalyticResponse } from "@/types/model/getAnalyticsOrg";

// Lấy danh sách showing theo eventId
export const getShowingsByEventId = async (eventId: number): Promise<IShowTime[]> => {
  // const endpoint = END_POINT_LIST.ORG_SHOWING.SHOWING_TIME.replace("{eventId}", eventId.toString());
  const res = await orgService.get(`${END_POINT_LIST.ORG_SHOWING.SHOWING_TIME}/${eventId}`);

  console.log("fetch showingTime")
  console.log(res)
  if (!res || !res.data) {
    throw new Error('Failed to fetch showing times');
  }
  return res.data.data;
};

// Lấy summary theo showingId
export const getSummaryByShowingId = async (showingId: string): Promise<IEventSummaryData> => {
  // const endpoint = END_POINT_LIST.ORG_STATISTICS.GET_SUMMARY.replace("{showingId}", showingId);

  const res = await orgService.get(`${END_POINT_LIST.ORG_STATISTICS.GET_SUMMARY}/${showingId}`);
  console.log("fetch sumarry")
  console.log(res)
  if (!res || !res.data) {
    throw new Error('Failed to fetch event summary');
  }

  return res.data.data;
};

// Lấy orders theo showingId
export const getOrdersByShowingId = async (showingId: string): Promise<GetOrdersResponse> => {
  // const endpoint = END_POINT_LIST.ORG_STATISTICS.GET_SUMMARY.replace("{showingId}", showingId);

  const res = await orgService.get(`${END_POINT_LIST.ORG_STATISTICS.GET_ORDERS}/${showingId}`);
  console.log("fetch orders")
  console.log(res)
  if (!res || !res.data) {
    throw new Error('Failed to fetch event orders');
  }

  return res.data.data;
};

// Lấy analytic theo eventId
export const getAnalyticByEvent = async (eventId: string, startDate?: string,endDate?: string): Promise<AnalyticResponse> => {
  const params: Record<string, string> = {};

  if (startDate) {
    params.startDate = startDate;
  }
  if (endDate) {
    params.endDate = endDate;
  }

  const res = await orgService.get(`${END_POINT_LIST.ORG_STATISTICS.GET_ANALYTIC}/${eventId}`, {
    params,
  });

  console.log("fetch analytics", res);

  if (!res || !res.data) {
    throw new Error('Failed to fetch event analytics');
  }

  return res.data;
};
