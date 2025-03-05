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
  effectiveFrom: string;
  effectiveTo: string;
  position: number;
  status: string;
  imageUrl: string;
  isHidden: boolean;
}

export interface Showing {
  id: string;
  eventId: number;
  status: string;
  isFree: boolean;
  isSalable: boolean;
  isPresale: boolean;
  seatMapId: number;
  startTime: string;
  endTime: string;
  isEnabledQueueWaiting: boolean;
  showAllSeats: boolean;
  TicketType: TicketType[];
}

export interface EventDetail {
  id: number;
  title: string;
  description: string;
  startDate: string;
  venue: string;
  showing: Showing[];
  minTicketPrice: number;
  Images_Events_imgPosterIdToImages?: { imageUrl: string };
  locationsString: string;
}
