export interface Event {
  id: number;
  title: string;
}

export interface TicketType {
  id: number;
}

export interface Showing {
  id: string;
  eventTitle: Event;
  startTime: string;
  endTime: string;
  seatMapId: number;
  numTicketType: TicketType[];
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

