import { TicketType } from "./tickettype.entity";
import { Decimal, JsonValue } from "@prisma/client/runtime/library";

interface Images {
  id: number;
  imageUrl: string;
}

interface EventFrontDisplay {
  id: number;
  title: string;
  lastScore: Decimal;
  Images_Events_imgLogoIdToImages: Images;
  Images_Events_imgPosterIdToImages: Images;
  totalClicks: number;
  weekClicks: number;
}

interface FormInput {
  id: number;
  formId: number;
  fieldName: string;
  type: string;
  required: boolean;
  regex?: string;
  options?: JsonValue;
}

export interface Form {
  id: number;
  name: string;
  FormInput: FormInput[];
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
  Form?:            Form;
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
  Form?:           Form;
  TicketType:           TicketType[];
  Events:                EventFrontDisplay;
}