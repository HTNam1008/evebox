export interface Image {
  id: number;
  url: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Event {
  id: number;
  title: string;
  organizerId?: string | null;
  createdAt: string;
  venue?: string | null;
  isApproved: boolean;
  deletedAt?: string | null;
  Images_Events_imgPosterIdToImages?: Image | null;
  categories: Category[];
}

export interface ConfirmApprovalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

//Tabs
export interface TabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}


export interface EventTableProps {
  activeTab: string;
  searchKeyword: string;
  categoryFilter: string
  dateFrom: string;
  dateTo: string;
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


//Filter
export interface FilterProps {
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
}

export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}


