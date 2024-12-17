import { Decimal } from "@prisma/client/runtime/library";
import { ShowingFront } from "src/modules/showing/domain/entities/showing.entity";

export interface Image{
  id: number;
  imageUrl: string;
}

export interface Categories{
  id: number;
  name: string;
}

export interface EventFrontDisplay {
  id: number;
  title: string;
  startDate: Date;
  lastScore: Decimal;
  Images_Events_imgLogoIdToImages: Image;
  Images_Events_imgPosterIdToImages: Image;
  totalClicks: number;
  weekClicks: number;
}

export interface EventSearchData {
  id: number;
  title: string;
  categories: Categories[];
  startDate: Date;
  endDate: Date;
  lastScore: Decimal;
  Images_Events_imgLogoIdToImages: Image;
  Images_Events_imgPosterIdToImages: Image;
}

export interface EventData {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  organizerId: string;
  status: string;
  locationId: number;
  Images_Events_imgLogoIdToImages: Image;
  Images_Events_imgPosterIdToImages: Image;
  createdAt: Date;
  locationsString: string;
  lastScore: Decimal;
  isSpecial: boolean;
  isOnlyOnEve: boolean;
  categories: Categories[];
  showing: ShowingFront[];
}

export interface EventCategorySpecial {
  Categories: Categories;
  Events: EventFrontDisplay;
}


export interface FrontDisplayData {
  specialEvents: EventFrontDisplay[];
  trendingEvents: EventFrontDisplay[]; 
  onlyOnEve: EventFrontDisplay[];
  categorySpecial: EventCategorySpecial[];
}