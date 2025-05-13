export interface Event {
  id: number;
  title: string;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  isFree: boolean;
  price: number;
  startTime: string;
  endTime: string;
  status: string;
  quantity: number;
  sold: number;
}

export interface Showing {
  id: string;
  event: Event;
  startTime: string;
  endTime: string;
  seatMapId: number;
  ticketTypes: TicketType[];
}

export interface ShowingFromApi {
  id: string;
  event: Event;
  startTime: string;
  endTime: string;
  seatMapId: number;
  TicketType: TicketType[];
}

export interface ShowingDetail {
  id: string;
  startTime: string;
  endTime: string;
  seatMapId: number;
  ticketTypes: TicketType[];
}

export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export interface SortIconProps<T> {
  field: keyof T;
  sortConfig: SortConfig<T> | null;
}

//Pagination
export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevious: () => void;
  onNext: () => void;
}

//Search
export interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export interface ShowingTableProps {
  searchKeyword: string;
  dateFrom: string;
  dateTo: string;
}

//Filter
export interface FilterProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
}

