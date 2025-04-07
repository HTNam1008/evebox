import { JsonValue } from 'type-fest';

export interface Seat{
  id: number;
  name: string;
  rowId: number;
  position: number;
  positionX: Float32Array;
  positionY: Float32Array;
  status: number;
} 

export interface Row{
  id: number;
  name: string;
  sectionId: number;
  Seat: Seat[];
}

export interface Section{
  id: number;
  name: string;
  seatmapId: number;
  isStage: boolean;
  element?: JsonValue;
  attribute: JsonValue;
  status: number;
  isReservingSeat: boolean;
  ticketTypeId?: string;
  Row?: Row[];
}

export interface SeatMap{
  id: number;
  name: string;
  viewBox: string;
  status: number;
  Section: Section[];
}