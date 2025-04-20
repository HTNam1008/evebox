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
  Images_Events_imgPosterIdToImages?: Image | null;
  isOnlyOnEve: boolean;
  isSpecial: boolean;
  categories: Category[];
}

export interface EventSpecialTableProps {
  searchKeyword: string;
  categoryFilter: string
}

//Pagination
export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevious: () => void;
  onNext: () => void;
}

//Filter
export interface FilterProps {
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}

export interface OptionType {
  label: string;
  value: string;
  isSeparator?: boolean;
};

//Search
export interface SearchBarProps {
  onSearch: (keyword: string) => void;
}
