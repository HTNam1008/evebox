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