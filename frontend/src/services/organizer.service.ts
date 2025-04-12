import { orgService } from "./instance.service";
import { END_POINT_LIST } from "./endpoints";
import { EventSummaryResponse } from "@/types/model/getSummaryOrg";

export const getEventSummary = async (eventId: number): Promise<EventSummaryResponse> => {
  const endpoint = END_POINT_LIST.ORG_STATISTICS.GET_SUMMARY.replace("{eventId}", eventId.toString());
  
  const res = await orgService.get(endpoint);

  if (!res) throw new Error('Failed to fetch event summary');

  return res.data;
};
