export interface Image {
  id: number;
  url: string;
}

export interface Event {
  id: number;
  title: string;
  organizerId?: string | null;
  createdAt: string;
  venue?: string | null;
  isApproved: boolean;
  deletedAt?: string | null;
  isOnline: boolean;
  Images_Events_imgPosterIdToImages?: Image | null;
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
}

//Pagination
export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevious: () => void;
  onNext: () => void;
}

