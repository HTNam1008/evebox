import { Decimal } from "@prisma/client/runtime/library";

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
  totalTickets: number;
  availableTickets: number;
  Images_Events_imgLogoIdToImages: Image;
  Images_Events_imgPosterIdToImages: Image;
  createdAt: Date;
  locations: {
    id: number;
    street: string;
    ward: string;
    districtId: number;
    createdAt: Date;
  };
  lastScore: Decimal;
  isSpecial: boolean;
  isOnlyOnEve: boolean;
  categories: Categories[];
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