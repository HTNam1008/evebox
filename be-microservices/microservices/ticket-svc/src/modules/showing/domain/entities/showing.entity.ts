import { TicketType } from "./tickettype.entity";
import { Decimal } from "@prisma/client/runtime/library";

interface Images {
  id: number;
  imageUrl: string;
}

interface EventFrontDisplay {
  id: number;
  title: string;
  startDate: Date;
  lastScore: Decimal;
  Images_Events_imgLogoIdToImages: Images;
  Images_Events_imgPosterIdToImages: Images;
  totalClicks: number;
  weekClicks: number;
  minTicketPrice?: number;
}

export interface ShowingFront{
  id    :                String;
  eventId:               number;
  status  :              String;
  isFree   :             Boolean;
  isSalable :            Boolean;
  isPresale  :           Boolean;
  seatMapId   :          number;
  startTime    :         Date;
  endTime       :        Date;
  isEnabledQueueWaiting: Boolean;
  showAllSeats:          Boolean;
  TicketType:           TicketType[];
}

export interface ShowingData{
  id    :                String;
  eventId:               number;
  status  :              String;
  isFree   :             Boolean;
  isSalable :            Boolean;
  isPresale  :           Boolean;
  seatMapId   :          number;
  startTime    :         Date;
  endTime       :        Date;
  isEnabledQueueWaiting: Boolean;
  showAllSeats:          Boolean;
  TicketType:           TicketType[];
  Events:                EventFrontDisplay;
}