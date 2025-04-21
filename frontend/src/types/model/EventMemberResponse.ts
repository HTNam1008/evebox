export interface EventMember {
    eventId: number;
    userId: string;
    email: string;
    role: number;
    role_desc: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
  }
  
  export interface EventMemberResponse {
    statusCode: number;
    message: string;
    data: EventMember[];
  }
  