export interface Image {
  id: number;
  imageUrl: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface EventAdminTable {
  id: number;
  title: string;
  organizerId?: string | null;
  startDate: string,
  createdAt: string;
  deleteAt?: string | null;
  Image_Events_imgLogoIdToImages?: Image | null;
  Images_Events_imgPosterIdToImages?: Image | null;
  locationString: string;
  venue: string | null;
  isApproved: boolean;
  isOnlyOnEve: boolean;
  isOnline: boolean;
  categories: Category[];
  meta: {
    totalCount: number;
    currentPage: number;
    nextPage: number | null;
    limit: number;
    totalPages: number;
  }
}

export interface ConfirmApprovalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
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

export interface EventDetail {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  organizerId: string | null;
  status: string;
  locationId: number;
  venue: string;
  Image_Events_imgLogoIdToImages?: Image | null;
  Images_Events_imgPosterIdToImages?: Image | null;
  createdAt: Date;
  isOnline: boolean;
  locationsString: string;
  lastScore: string;
  isSpecial: boolean;
  isOnlyOnEve: boolean;
  isApproved: boolean;
  deleteAt: Date | null;
  orgName: string;
  orgDescription: string;
  categories: Category[];
  locations: {
    id: number;
    street: string;
    ward: string;
    districtId: number;
    createdAt: string;
    districts: {
      name: string;
      province: {
        name: string;
      };
    };
  };
}