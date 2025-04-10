import { eventService } from "./instance.service";
import { END_POINT_LIST } from "./endpoints";
import { BaseApiResponse } from "@/types/BaseApiResponse";
import { Category, FrontDisplayResponse, Event } from "@/types/model/frontDisplay";

export const getFrontDisplayEvents = async (): Promise<FrontDisplayResponse> => {
  const res = await eventService.get(END_POINT_LIST.EVENT.GET_FRONT_DISPLAY);

  if (!res) throw new Error('Failed to fetch front display events');

  return res.data;
}

export const getRecommendedEvents = async (timeWindow: string): Promise<BaseApiResponse<Event[]>> => {
  const res = await eventService.get(END_POINT_LIST.EVENT.GET_RECOMMENDED_EVENTS, {
    params: { timeWindow }
  });

  if (!res) throw new Error('Failed to fetch recommended events');

  return res.data;
}

export const getAllCategories = async (): Promise<BaseApiResponse<Category[]>> => {
  const res = await eventService.get(END_POINT_LIST.EVENT.ALL_CATEGORIES);

  if (!res) throw new Error('Failed to fetch categories');

  return res.data;
}

interface SearchEventsParams {
  title: string;
  type?: string;       // comma-separated category names
  startDate?: string;  // in YYYY-MM-DD format
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const searchEvents = async (params: SearchEventsParams): Promise<BaseApiResponse<Event[]>> => {
  const urlParams = new URLSearchParams();
  urlParams.append("title", params.title);
  if (params.type) urlParams.append("type", params.type);
  if (params.startDate) urlParams.append("startDate", params.startDate);
  if (params.endDate) urlParams.append("endDate", params.endDate);
  if (params.minPrice !== undefined) urlParams.append("minPrice", params.minPrice.toString());
  if (params.maxPrice !== undefined) urlParams.append("maxPrice", params.maxPrice.toString());

  const res = await eventService.get(END_POINT_LIST.EVENT.SEARCH_EVENTS, {
    params: urlParams,
    headers: {
      'Cache-Control': 'max-age=60',
    }
  });

  if (!res) throw new Error('Failed to fetch events');

  return res.data;
}