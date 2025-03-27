import { Categories } from './../../../../backend/dist/modules/event/domain/entities/categories.entity.d';
// types/user.ts

import { BaseApiResponse } from "../BaseApiResponse";

export interface Event {
  id: number;
  title: string;
  lastScore: string;
  status: string;
  startDate: string;
  categories: Categories[];
  Images_Events_imgPosterIdToImages?: { imageUrl: string };
  minTicketPrice: number;
}

export type SearchEventsResponse = BaseApiResponse<Event[]>;