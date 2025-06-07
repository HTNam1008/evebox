export interface EventDetail {
  title: string;
  venue: string;
  orgName: string;
}

export interface Venue {
  street: string;
  ward: string;
  district: string;
  province: string;
  event: EventDetail;
}

export interface OrganizerLocationGroup {
  id: number;
  organizerId: string;
  venues: Venue[];
}

export interface GetAllLocationsResponseDto {
  statusCode: number;
  message: string;
  data: OrganizerLocationGroup[];
}
