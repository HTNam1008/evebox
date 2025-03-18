import { BaseApiResponse } from "../BaseApiResponse";
import { JsonValue } from "type-fest";

export interface Seat {
  id: number;
  name: string;
  rowId: number;
  position: number;
  positionX: Record<string, number>;
  positionY: Record<string, number>;
  createdAt: Date;
  status: number;
}

export interface SeatMapElement {
  type: string;
  data: string;
  fill: string;
  x: number;
  y: number;
}

export interface Row {
  id: number;
  name: string;
  sectionId: number;
  createdAt: Date;
  Seat: Seat[];
}

export interface Section {
  id: number;
  name: string;
  seatmapId: number;
  createdAt: Date;
  isStage: boolean;
  element?: SeatMapElement[];
  attribute: JsonValue;
  ticketTypeId?: string;
  Row?: Row[];
}

export interface SeatMap {
  id: string | number;
  name: string;
  createdAt: Date;
  viewBox: string;
  status: number;
  hasSeat: boolean;
  Section?: Section[];
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  color: string;
  isFree: boolean;
  price: number;
  originalPrice: number;
  maxQtyPerOrder: number;
  minQtyPerOrder: number;
  effectiveFrom: Date;
  effectiveTo: Date;
  position: number;
  status: string;
  imageUrl: string;
  isHidden: boolean;
}

export interface ShowingData {
  id: string | number;
  eventId: number;
  status: string;
  isFree: boolean;
  isSalable: boolean;
  isPresale: boolean;
  seatMapId: number;
  startTime: Date;
  endTime: Date;
  isEnabledQueueWaiting: boolean;
  showAllSeats: boolean;
  Events?: {
    id: number;
    title: string;
    startDate: Date;
    status: string;
    lastScore: string;
    minTicketPrice: number;
    Images_Events_imgLogoIdToImages?: {
      id: number;
      imageUrl: string;
    };
    Images_Events_imgPosterIdToImages?: {
      id: number;
      imageUrl: string;
    };
    totalClicks: number;
    weekClicks: number;
  };
  TicketType?: TicketType[];
  SeatMap?: SeatMap;
}

export type SeatMapResponse = BaseApiResponse<ShowingData>;
