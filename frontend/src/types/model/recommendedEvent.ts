// types/user.ts

import { BaseApiResponse } from "../BaseApiResponse";

export interface Event {
  id: number;
  title: string;
  startDate: string;
  status: string;
  Images_Events_imgPosterIdToImages?: { imageUrl: string };
  minTicketPrice: number;
}

export type RecommendedEventsResponse = BaseApiResponse<Event[]>;