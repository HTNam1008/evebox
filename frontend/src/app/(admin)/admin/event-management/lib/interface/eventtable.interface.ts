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