import createApiClient from "@/services/apiClient";
import { END_POINT_LIST } from "@/services/endpoints";

const eventService = createApiClient(process.env.NEXT_PUBLIC_API_URL!);

export const getFrontDisplayEvents = async () => {
  try {
    const res = await eventService.get(END_POINT_LIST.EVENT.GET_FRONT_DISPLAY, {
      headers: {
        'Cache-Control': 'max-age=60',
      }
    });

    if (!res) throw new Error('Failed to fetch front display events');

    return res.data;
  } catch (error) {
    console.error('Error fetching front display events:', error);
    throw error;
  }
}

export const getRecommendedEvents = async (timeWindow : string) => {
  try {
    const res = await eventService.get(END_POINT_LIST.EVENT.GET_RECOMMENDED_EVENTS, {
      params: { timeWindow  },
      headers: {
        'Cache-Control': 'max-age=60',
      }
    });

    if (!res) throw new Error('Failed to fetch recommended events');

    return res.data;
  } catch (error) {
    console.error('Error fetching recommended events:', error);
    throw error;
  }
}

export const getAllCategories = async () => {
  try {
    const res = await eventService.get(END_POINT_LIST.EVENT.ALL_CATEGORIES);

    if (!res) throw new Error('Failed to fetch categories');

    return res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

interface SearchEventsParams {
  title: string;
  type?: string;       // comma-separated category names
  startDate?: string;  // in YYYY-MM-DD format
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const searchEvents = async ({ title, type, startDate, endDate, minPrice, maxPrice }: SearchEventsParams) => {
  try {
    const params = new URLSearchParams();
    params.append("title", title);
    if (type) params.append("type", type);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
    if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());

    const res = await eventService.get(END_POINT_LIST.EVENT.SEARCH_EVENTS, {
      params: params,
      headers: {
        'Cache-Control': 'max-age=60',
      }
    });

    if (!res) throw new Error('Failed to fetch events');

    return res.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}