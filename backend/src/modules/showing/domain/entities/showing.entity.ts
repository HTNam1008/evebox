import { TicketType } from "src/modules/ticket/domain/entities/ticket.entity";

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