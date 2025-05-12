import { eventService } from "./instance.service";
import { END_POINT_LIST } from "./endpoints";
import { BaseApiResponse } from "@/types/BaseApiResponse";
import { Category, FrontDisplayResponse, Event } from "@/types/model/frontDisplay";
import { EventAdminTable, EventDetail } from "@/app/(admin)/admin/event-management/lib/interface/eventTable.interface";
import { Showing } from "@/app/(admin)/admin/showing-management/lib/interface/showingTable.interface";
import { TicketOfShowing } from "@/app/(admin)/admin/showing-management/lib/interface/ticketTable.interface";

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

export const getFDByIds = async (eventIds: number[]): Promise<Event[]> => {

  try {
    const res = await eventService.get(END_POINT_LIST.EVENT.GET_FRONT_DISPLAY_BY_IDS, {
      params: { ids: eventIds },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
  return []
};

interface PostClickParams {
  eventId: number;
  userId?: string; // Optional: could be a real user or a guest UUID
}

export const postClickEvent = async (
  params: PostClickParams
): Promise<BaseApiResponse<string>> => {
  const urlParams = new URLSearchParams();
  urlParams.append("eventId", params.eventId.toString());
  if (params.userId) urlParams.append("userId", params.userId);

  const res = await eventService.post(
    `${END_POINT_LIST.EVENT.CLICKS}?${urlParams.toString()}`
  );

  if (!res) throw new Error("Failed to post click event");

  return res.data;
};

export interface EventManagementApiResponse {
  data: EventAdminTable[];
  meta: {
    totalCount: number;
    currentPage: number;
    nextPage: number | null;
    limit: number;
    totalPages: number;
  };
}

export const getEventsManagement = async (params: {
  page: number;
  limit: number;
  isApproved?: boolean;
  isDeleted?: boolean;
  createdFrom?: string;
  createdTo?: string;
  categoryId?: number;
  search?: string;
}): Promise<EventManagementApiResponse> => {
  const response = await eventService.get<BaseApiResponse<EventManagementApiResponse>>(END_POINT_LIST.ADMIN.EVENTS, {
    params
  });

  if (response.status !== 200) throw new Error(response.data.message);

  return response.data.data;
}

export interface UpdateEventAdminBody {
  isSpecial?: boolean | null;
  isOnlyOnEve?: boolean | null;
  isSpecialForCategory?: boolean | null;
  isApproved?: boolean | null;
  categoryIds?: number[];
}

export const updateEventAdmin = async (eventId: number, body: UpdateEventAdminBody): Promise<boolean> => {
  const response = await eventService.put<BaseApiResponse<boolean>>(`${END_POINT_LIST.ADMIN.EVENTS}/${eventId}`, body);
  
  if (response.status !== 200) throw new Error(response.data.message);

  return response.data.statusCode === 200;
}

interface RawEventDetail extends Omit<EventDetail, 'categories'> {
  EventCategories: {
    Categories: Category;
  }[];
}

export const getEventDetail = async (eventId: number): Promise<EventDetail> => {
  const response = await eventService.get<BaseApiResponse<RawEventDetail>>(
    `${END_POINT_LIST.EVENT.GET_EVENT_DETAIL}?eventId=${eventId}`
  );

  if (response.status !== 200) throw new Error(response.data.message);

  // Nếu cần map EventCategories → categories
  const raw = response.data.data;
  const categories = raw.EventCategories?.map((e) => e.Categories) || [];

  return {
    ...raw,
    categories
  };
}

export const getShowingsOfEvent = async (eventId: number): Promise<Showing[]> => {
  const response = await eventService.get<BaseApiResponse<Showing[]>>(`${END_POINT_LIST.ORG_SHOWING.SHOWING}/${eventId}`);

  if (response.status !== 200) throw new Error(response.data.message);

  return response.data.data;
}

export interface ShowingManagementApiResponse {
  data: Showing[];
  meta: {
    totalCount: number;
    currentPage: number;
    nextPage: number | null;
    limit: number;
    totalPages: number;
  };
}

export const getShowingsManagement = async(params: {
  page: number;
  limit: number;
  startTime?: string;
  endTime?: string;
  search?: string;
}): Promise<ShowingManagementApiResponse> => {
  const response = await eventService.get<BaseApiResponse<ShowingManagementApiResponse>>(END_POINT_LIST.ADMIN.SHOWINGS, {
    params
  });

  if (response.status !== 200) throw new Error(response.data.message);
  return response.data.data;
}

export const getShowingDetail = async (showingId: string): Promise<Showing> => {
  const response = await eventService.get<BaseApiResponse<Showing>>(`${END_POINT_LIST.ADMIN.SHOWINGS}/${showingId}`);

  if (response.status !== 200) throw new Error(response.data.message);

  return response.data.data;
}

export const getTicketDetailOfShowing = async (showingId: string, ticketTypeId: string): Promise<TicketOfShowing> => {
  const response = await eventService.get<BaseApiResponse<TicketOfShowing>>(`${END_POINT_LIST.ADMIN.SHOWINGS}/${showingId}/${ticketTypeId}`);

  if (response.status !== 200) throw new Error(response.data.message);

  return response.data.data;
}