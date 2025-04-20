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

//Pagination
export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevious: () => void;
  onNext: () => void;
}

