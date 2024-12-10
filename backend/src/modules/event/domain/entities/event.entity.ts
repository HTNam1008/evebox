export class Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  organizerId: string | null;
  status: string;
  locationId: number;
  totalTickets: number;
  availableTickets: number;
  imgLogoId: number | null;
  imgPosterId: number | null;
  createdAt: Date;
  isOnlyOnEve: boolean;
  isSpecial: boolean;
  lastScore: number;
  categories: string[];
}
