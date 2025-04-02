import exp from "constants";
import { EventData, EventFrontDisplay } from "./event.entity";

export interface Categories{
  id: number;
  name: string;
}

export interface EventCategorySpecial {
  Categories: Categories;
  Events: EventFrontDisplay;
}

export interface EventCategory {
  Categories: Categories;
  Events: EventData;
}

export interface EventCategoryData {
  id: number;
  categoryId: number;
  eventId: number;
  isSpecial: boolean;
}